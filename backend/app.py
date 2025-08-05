from flask import Flask,redirect, request, make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import or_, and_
from flask import jsonify
from datetime import datetime
from Vnpay import settings
from Vnpay.vnpay import vnpay
from marshmallow import Schema, fields, validate, ValidationError
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Data_Shoes.db'
db = SQLAlchemy(app)
CORS(app, supports_credentials=True)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=True) 
    last_name = db.Column(db.String(255), nullable=True) 
    username = db.Column(db.String(100), unique=True, nullable=False)  
    password = db.Column(db.String(100), nullable=False)
    
    cart = db.relationship('Cart', back_populates='user', uselist=False, cascade='all, delete-orphan')
    order = db.relationship('Order', back_populates='user')

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(100), nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False) 
    size = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(100), nullable=False)
    delivery_method = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(100), nullable=False)
    
    user = db.relationship('User', back_populates='order')    

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    thumbnail = db.Column(db.String(255), nullable=True)  
    category = db.Column(db.String(100), nullable=False)
    fit = db.Column(db.String(100), nullable=False)
    tag = db.Column(db.String(100), nullable=False)
    
    images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')

class ProductImage(db.Model):
    __tablename__ = 'product_images'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    
    product = db.relationship('Product', back_populates='images')

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    user = db.relationship('User', back_populates='cart')
    items = db.relationship('CartItem', back_populates='cart', cascade='all, delete-orphan')

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False) 
    size = db.Column(db.String(100), nullable=False)
    
    cart = db.relationship('Cart', back_populates='items')
    product = db.relationship('Product')

class ProductSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    price = fields.Float()
    thumbnail = fields.Str()
    category = fields.Str()
    fit = fields.Str()
    tag = fields.Str()

class CartItemSchema(Schema):
    quantity = fields.Int()
    size = fields.Str()
    product = fields.Nested(ProductSchema)

products_schema = ProductSchema(many=True)
cart_item_schema = CartItemSchema(many=True)

class NavigationProductResource(Resource):
    def get(self):
        """
        Get products based on category, fit, and tag.
        """
        category = request.args.get('category')
        fit = request.args.get('fit')
        tag = request.args.get('tag')

        query = Product.query

        if category:
            query = query.filter(Product.category == category)
        if fit:
            query = query.filter(Product.fit == fit)
        if tag:
            query = query.filter(Product.tag == tag)

        try:
            products = query.all()
            result = products_schema.dump(products)
            return jsonify(result)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class SearchProduct(Resource):
    def get(self):
        """
        Search products based on a keyword.
        """
        keyWord = request.args.get('k')

        if not keyWord:
            return {"error": "Keyword is required"}, 400

        try:
            products = Product.query.filter(Product.name.ilike(f'%{keyWord}%')).all()
            result = products_schema.dump(products)
            return jsonify(result)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    

class FilterProductResource(Resource):
    def get(self):
        """
        Filter products based on fit, category, sport, price range, and sort order.
        """
        fit = request.args.get('fit')
        category = request.args.get('category')
        sport = request.args.get('sport')
        price_range = request.args.get('price_range')
        sort = request.args.get('sort')

        query = Product.query

        if fit:
            query = query.filter(Product.fit == fit)
        if category:
            query = query.filter(Product.category == category)
        if sport:
            query = query.filter(Product.category == sport)
        if price_range:
            price_filters = {
                '$50 - $75': (50.0, 75.0),
                '$75 - $100': (75.0, 100.0),
                '$100 - $150': (100.0, 150.0),
                '$150 - $200': (150.0, 200.0)
            }
            if price_range in price_filters:
                min_price, max_price = price_filters[price_range]
                query = query.filter(and_(Product.price >= min_price, Product.price <= max_price))
        if sort:
            sort_options = {
                'Best Seller': Product.tag == 'bestseller',
                'Price Low To High': Product.price.asc(),
                'Price High To Low': Product.price.desc()
            }
            if sort in sort_options:
                if sort == 'Best Seller':
                    query = query.filter(sort_options[sort])
                else:
                    query = query.order_by(sort_options[sort])

        try:
            products = query.all()
            result = products_schema.dump(products)
            return jsonify(result)
        except Exception as e:
            return {"error": str(e)}, 500

class ProductDetailSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    price = fields.Float()
    thumbnail = fields.Str()
    category = fields.Str()
    fit = fields.Str()
    tag = fields.Str()
    images = fields.List(fields.Str())

product_detail_schema = ProductDetailSchema()

class ProductDetailResource(Resource):
    def get(self):
        """
        Get product details by ID.
        """
        id = request.args.get('id')
        if not id:
            return {"error": "Product ID is required"}, 400

        try:
            product = Product.query.filter_by(id=id).first()
            if not product:
                return {'message': 'Product not found'}, 404

            product_images = ProductImage.query.filter_by(product_id=id).all()
            product_data = {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'thumbnail': product.thumbnail,
                'category': product.category,
                'fit': product.fit,
                'tag': product.tag,
                'images': [image.image_url for image in product_images]
            }

            result = product_detail_schema.dump(product_data)
            return jsonify(result)
        except Exception as e:
            return {"error": str(e)}, 500
    
class RegisterSchema(Schema):
    first_name = fields.Str(required=True, validate=validate.Length(min=1))
    last_name = fields.Str(required=True, validate=validate.Length(min=1))
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(required=True, validate=validate.Length(min=6))

register_schema = RegisterSchema()

class Register(Resource):
    def post(self):
        """
        Register a new user.
        """
        try:
            data = request.get_json()
            validated_data = register_schema.load(data)
        except ValidationError as err:
            return jsonify(err.messages), 400
            
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        username = validated_data['username']
        password = validated_data['password']
        
        if User.query.filter_by(username=username).first():
            print("??????")
            return {'message': 'Username already exists'}, 400
        
        hashed_password = generate_password_hash(password)
        user = User(username=username, password=hashed_password, first_name=first_name, last_name=last_name)
        db.session.add(user)
        db.session.commit()

        response = jsonify({
            'message': 'User created successfully',
            'userId': user.id
        })

        response.status_code = 201

        response.set_cookie('user_id', str(user.id), httponly=True, secure=True)

        return response

class Login(Resource):
    def post(self):
        """
        User login.
        """
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {'message': 'Username and password are required'}, 400

        user = User.query.filter_by(username=username).first()

        if user is None or not check_password_hash(user.password, password):
            return {'message': 'Invalid username or password'}, 400

        response = make_response(jsonify({
            'message': 'User login successfully',
            'userId': user.id
        }), 200)
        response.set_cookie('user_id', str(user.id), httponly=True, secure=True)
        return response

class Logout(Resource):
    def post(self):
        """
        User logout.
        """
        response = make_response(jsonify({'message': 'Logged out successfully'}), 200)
        response.delete_cookie('user_id')
        return response

class CheckLogin(Resource):
    def get(self):
        """
        Check if the user is logged in.
        """
        user_id = request.cookies.get('user_id')
        if not user_id:
            return {'message': 'Not logged in'}, 401

        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {'message': 'Invalid user'}, 401

        return {'message': 'User is logged in', 'userId': user_id}, 200   
    
class GetCartItems(Resource):
    def post(self):
        """
        Get cart items for a user.
        """
        data = request.get_json()
        user_id = data.get('userId')
        if not user_id:
            return {'message': 'User ID is required'}, 400

        cart = Cart.query.filter_by(user_id=user_id).first()

        if not cart:
            cart = Cart(user_id=user_id)
            db.session.add(cart)
            db.session.commit()
            return {'message': 'No cart data, created new cart'}, 400

        cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

        product_schema = ProductSchema()
        result = []

        for item in cart_items:
            product = Product.query.filter_by(id=item.product_id).first()
            if product:
                product_data = product_schema.dump(product)
                item_data = {
                    'quantity': item.quantity,
                    'size': item.size,
                    'product': product_data
                }
                result.append(item_data)

        return jsonify(result)

class UpdateCart(Resource):
    def post(self):
        """
        Update the cart items for a user.
        """
        data = request.get_json()
        items = data.get('cart')
        user_id = data.get('userId')

        if not user_id:
            return {'message': 'Invalid data'}, 400

        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart:
            return {'message': 'Cart not found'}, 404

        CartItem.query.filter_by(cart_id=cart.id).delete()
        db.session.commit()

        if not items:
            return {'message': 'Cart updated successfully'}, 200

        for item in items:
            cart_item = CartItem(
                cart_id=cart.id,
                product_id=item['product_id'],
                quantity=item['product_quantity'],
                size=item['size']
            )
            db.session.add(cart_item)

        db.session.commit()

        return {'message': 'Cart updated successfully'}, 200

class AddOrder(Resource):
    def post(self):
        """
        Add a new order.
        """
        try:
            data = request.get_json()

            for item in data['order_data']:
                order = Order(
                    user_id=data['user_id'],
                    order_id=data['order_id'],
                    product_id=item['product_id'],
                    quantity=item['product_quantity'],  
                    size=item['size'],
                    name=data['name'],
                    email=data['email'],
                    country=data['country'],
                    city=data['city'],
                    district=data['district'],
                    street=data['street'],
                    phone_number=data['phone_number'],  
                    delivery_method=data['delivery_method'],
                    status=data['status'],  
                    total_amount=data['total_amount'],
                    date=data['date']
                )
                db.session.add(order)

            db.session.commit()
        
            return {'message': 'Order added successfully'}, 200
        
        except Exception as e:
            db.session.rollback()
            return {'message': f'An error occurred: {str(e)}'}, 500

class UpdateStatusOrder(Resource):
    def get(self):
        """
        Update the status of orders to 'confirm' based on order_id.
        """
        order_id = request.args.get('order_id')
        if not order_id:
            return {'message': 'Order ID is required'}, 400

        try:
            order_data = Order.query.filter_by(order_id=order_id).all()
            if not order_data:
                return {'message': 'No orders found for the given order ID'}, 404

            result = []

            for item in order_data:
                item.status = 'confirm'
                
                product = Product.query.filter_by(id=item.product_id).first()
                if product:
                    result.append({
                        'product_id': product.id,
                        'product_name': product.name,
                        'product_quantity': item.quantity,  
                        'product_price': product.price,
                        'product_thumbnail': product.thumbnail,
                        'product_size': item.size,
                        'delivery_method': item.delivery_method,
                        'status': item.status,
                        'total_amount': item.total_amount
                    })

            db.session.commit()
            return {'updated_orders': result}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': f'An error occurred: {str(e)}'}, 500

class GetOrderItems(Resource):
    def get(self):
        """
        Get order items for a user.
        """
        user_id = request.args.get('user_id')
        if not user_id:
            return {'message': 'User ID is required'}, 400

        order_data = Order.query.filter_by(user_id=user_id).all()
        
        if not order_data:
            return {'message': 'No order data'}, 400
        
        result = [
            {
                'order_id': item.order_id,
                'date': item.date,
                'total_amount': item.total_amount,
                'status': item.status,
            }
            for item in order_data
        ]
    
        return {'message': 'Get order data complete', 'order_data': result}, 200

class RemoveOrder(Resource):
    def get(self):
        """
        Remove an order based on order_id.
        """
        order_id = request.args.get('order_id')
        if not order_id:
            return {'message': 'Order ID is required'}, 400
        
        result = Order.query.filter_by(order_id=order_id).delete()
        db.session.commit()

        if result:
            return {'message': 'Order removed successfully'}, 200
        else:
            return {'message': 'Order not found'}, 404

class GetOrderDetail(Resource):
    def get(self):
        """
        Get order details based on order_id.
        """
        order_id = request.args.get('order_id')
        if not order_id:
            return {'message': 'Order ID is required'}, 400

        order_data = Order.query.filter_by(order_id=order_id).all()
        
        if not order_data:
            return {'message': 'No order data detail'}, 400
        
        result = []

        for item in order_data:
            product = Product.query.filter_by(id=item.product_id).first()
            if product:
                result.append({
                    'order_id': item.order_id,
                    'date': item.date,
                    'total_amount': item.total_amount,
                    'status': item.status,
                    'email': item.email,
                    'city': item.city,
                    'street': item.street,
                    'district': item.district,
                    'delivery_method': item.delivery_method,
                    'product_thumbnail': product.thumbnail,
                    'product_name': product.name,
                    'product_price': product.price,
                    'product_quantity': item.quantity,
                    'product_size': item.size
                })
    
        return {'message': 'Get order detail data complete', 'order_data': result}, 200         
      

class Payment(Resource):
    def post(self):
        data = request.get_json()
        order_type = data.get('order_type')
        order_id = data.get('order_id')
        amount = int(data.get('amount'))
        order_desc = data.get('order_desc')
        bank_code = data.get('bank_code')
        language = data.get('language')
        ipaddr = request.remote_addr

        vnp = vnpay()
        vnp.requestData['vnp_Version'] = '2.1.0'
        vnp.requestData['vnp_Command'] = 'pay'
        vnp.requestData['vnp_TmnCode'] = settings.VNPAY_TMN_CODE
        vnp.requestData['vnp_Amount'] = amount * 100
        vnp.requestData['vnp_CurrCode'] = 'VND'
        vnp.requestData['vnp_TxnRef'] = order_id
        vnp.requestData['vnp_OrderInfo'] = order_desc
        vnp.requestData['vnp_OrderType'] = order_type
        
        vnp.requestData['vnp_Locale'] = language if language else 'vn'

        vnp.requestData['vnp_CreateDate'] = datetime.now().strftime('%Y%m%d%H%M%S')
        vnp.requestData['vnp_IpAddr'] = ipaddr
        vnp.requestData['vnp_ReturnUrl'] = settings.VNPAY_RETURN_URL
        
        vnpay_payment_url = vnp.get_payment_url(settings.VNPAY_PAYMENT_URL, settings.VNPAY_HASH_SECRET_KEY)
  
        return vnpay_payment_url

class PaymentIPN(Resource):
    def post(self):
        inputData = request.get_json()  

        vnp_ResponseCode = inputData.get('vnp_ResponseCode') 
        vnp_SecureHash = inputData.get('vnp_SecureHash')
        vnp_BankCode = inputData.get('vnp_BankCode')
        vnp_Amount = inputData.get('vnp_Amount')
        vnp_OrderInfo = inputData.get('vnp_OrderInfo')
        vnp_TransactionNo = inputData.get('vnp_TransactionNo')
        vnp_TransactionStatus = inputData.get('vnp_TransactionStatus')
        vnp_TxnRef = inputData.get('vnp_TxnRef')
        vnp_TmnCode = inputData.get('vnp_TmnCode')
        vnp_BankTranNo = inputData.get('vnp_BankTranNo')
        vnp_PayDate = inputData.get('vnp_PayDate')
        vnp_CardType = inputData.get('vnp_CardType')
        vnp_SecureHashType = inputData.get('vnp_SecureHashType')

        vnp = vnpay()
        vnp.responseData['vnp_ResponseCode'] = vnp_ResponseCode
        vnp.responseData['vnp_SecureHash'] = vnp_SecureHash
        vnp.responseData['vnp_BankCode'] = vnp_BankCode
        vnp.responseData['vnp_Amount'] = vnp_Amount
        vnp.responseData['vnp_OrderInfo'] = vnp_OrderInfo
        vnp.responseData['vnp_TransactionNo'] = vnp_TransactionNo
        vnp.responseData['vnp_TransactionStatus'] = vnp_TransactionStatus
        vnp.responseData['vnp_TxnRef'] = vnp_TxnRef
        vnp.responseData['vnp_TmnCode'] = vnp_TmnCode
        vnp.responseData['vnp_BankTranNo'] = vnp_BankTranNo
        vnp.responseData['vnp_PayDate'] = vnp_PayDate
        vnp.responseData['vnp_CardType'] = vnp_CardType
        vnp.responseData['vnp_SecureHashType'] = vnp_SecureHashType

        if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
            if vnp_ResponseCode == '00':
                return jsonify({'RspCode': '00', 'Message': 'Order payment success'}) 
            else:
                return jsonify({'RspCode': vnp_ResponseCode, 'Message': 'Order payment failure'})
        else:
            return jsonify({'RspCode': '99', 'Message': 'Invalid request'})


api.add_resource(NavigationProductResource, '/products')
api.add_resource(FilterProductResource, '/filter')
api.add_resource(ProductDetailResource, '/product_detail')
api.add_resource(SearchProduct, '/search')
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckLogin, '/check_login')
api.add_resource(GetCartItems, '/get_cart')
api.add_resource(UpdateCart, '/update_cart')
api.add_resource(AddOrder, '/order')
api.add_resource(GetOrderItems, '/get_order')
api.add_resource(GetOrderDetail, '/get_order_detail')
api.add_resource(UpdateStatusOrder, '/update_order')
api.add_resource(RemoveOrder, '/remove_order')
api.add_resource(Payment, '/payment')
api.add_resource(PaymentIPN, '/payment_ipn')


if __name__ == '__main__':
    app.run(debug=True)
