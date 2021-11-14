from django.db.models import query
from django.db.models.deletion import RESTRICT
from django.shortcuts import render,get_object_or_404
from rest_framework import serializers, views, viewsets
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import response
from rest_framework.decorators import authentication_classes, permission_classes
from .models import *
from rest_framework import generics,mixins,views
from .serializers import CategorySerializer, OrderSerializer, ProductsSerializer, Category, ProfileSerializer,CartSerializer,CartProductSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
# Create your views here.


class ProductView(generics.GenericAPIView,mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductsSerializer
    lookup_field = "id" # The model field that should be used to for performing object lookup of individual model instances.

    def get(self,request, id=None):
        if id:
            return self.retrieve(request)
        else:
           return self.list(request)

class CategoryView(viewsets.ViewSet):

    def list(self,request):
        query_set = Category.objects.all().order_by("-id")
        serializer = CategorySerializer(query_set, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Category.objects.get(id=pk)
        serializer = CategorySerializer(queryset,many=False)
        serializer_data=serializer.data
        all_data=[]
        category_products=Product.objects.filter(category=serializer_data["id"])
        category_products_serializer=ProductsSerializer(category_products, many=True)
        serializer_data["category_product"]= category_products_serializer.data
        all_data.append(serializer_data)
        return Response(all_data)

class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes=[IsAuthenticated, ]

    def get(self,request):
        try:
            query = Profile.objects.get(prouser = request.user)
            serializer = ProfileSerializer(query, many=False)
            response_msg ={"error":False, "data":serializer.data}
        except:
            response_msg ={"error":True, "msg":"Something is wrong"}
        return Response(response_msg)

class ProfileUpdate(views.APIView):
    permissions_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self,request):
        try:
            query = Profile.objects.get(prouser = request.user)
            serializer = ProfileSerializer(query, data=request.data , context ={'request':request})
            serializer.is_valid()
            serializer.save()
            response_msg={"Msg":"Data is found"}
        except:
            response_msg={"msg":"Data is not found"}
        return Response(response_msg)

class UserDataUpdate(views.APIView):
    authentication_classes =[TokenAuthentication, ]
    permission_classe = [IsAuthenticated, ]
    
    
    def post(self,request):
        data= request.data
        try:
            print(request.user)
            user_obj = User.objects.get(username=request.user)
            user_obj.first_name=data['first_name']
            user_obj.last_name=data['last_name']
            user_obj.email=data['email']
            user_obj.save()
            response_msg ={"Msg":"User Data update"} 
        except:
            response_msg ={"Error":"User data not found"}
        return Response(response_msg)

class MyCart(viewsets.ViewSet):

    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self,request):
        query=Cart.objects.filter(customer= request.user.profile)
        serializer=CartSerializer(query, many=True)
        all_data=[]
        for cart in serializer.data:
            cart_products=CartProduct.objects.filter(cart=cart["id"])
            cart_products_serializer = CartProductSerializer(cart_products, many=True)
            cart["cart_products"]=cart_products_serializer.data
            all_data.append(cart)

        return Response(all_data)

class Oldorders(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self,request):
        query = Order.objects.filter(cart__customer = request.user.profile) 
        serializer=OrderSerializer(query, many=True)
        all_data=[]
        for order in serializer.data:
            cart_products = CartProduct.objects.filter(cart_id =  order["cart"]["id"]) 
            cart_products_serializer = CartProductSerializer(cart_products, many =True)
            order["cartproducts"] = cart_products_serializer.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self,request,pk=None):
        try:
            query = Order.objects.get(id=pk)
            serializer=OrderSerializer(query, many=False)
            serializer_data=serializer.data
            all_data=[]
            cart_products=CartProduct.objects.filter(cart_id=serializer.data["cart"]["id"])
            cart_products_serializer = CartProductSerializer(cart_products, many=True)
            serializer_data["cart_products"]=cart_products_serializer.data
            all_data.append(serializer_data)
            response_msg={"error":False, "data":all_data}
        except:
            response_msg={"error":True, "Message":"Data not found"}
        return Response(response_msg)
    
    def create(self, request):

        try:
            data = request.data
            cart_id=data["cart_id"]
            address=data["address"]
            email=data["email"]
            mobile=data["mobile"]
            cart_obj=Cart.objects.get(id=cart_id)
            cart_obj.complete=True
            cart_obj.save()
            Order.objects.create(
                cart=cart_obj,
                address=address,
                mobile=mobile,
                email=email,
                total=cart_obj.total,
                discount= 3
            )
            response_msg={"error":False,"msg":"succesfully order cart"}
        except:
            response_msg={"error":True,"msg":"Something is wrong ...!!!"}
        return Response(response_msg)

    def destroy(self,request,pk=None):
        try: 
            order_obj=Order.objects.get(id=pk)
            cart_obj=Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            response_msg ={"error":False,"msg":"Order successfully deleted"}
        except:
            response_msg ={"error":True,"msg":"Something went wrong"}
        return Response(response_msg)


class Addtocart(views.APIView):
    authentication_classes= [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
               
        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        
        try:
            if cart_cart:

                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.selling_price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
                else:
                    
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
            else:
               
                Cart.objects.create(customer=request.user.profile,total=0,complete=False)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  = product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                cart_product_new.product.add(product_obj)
                   
                new_cart.total +=product_obj.selling_price
                new_cart.save()

            response_mesage = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            response_mesage = {'error':True,'message':"Product Not add!Somthing is Wromg"}

        return Response(response_mesage)


class AddQuantity(views.APIView):
    authentication_classes= [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        product_id = request.data['id']
        product_obj=Product.objects.get(id=product_id)

        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
        cartprod_uct.quantity +=1
        cartprod_uct.subtotal +=product_obj.selling_price
        cartprod_uct.save()
        cart_cart.total +=product_obj.selling_price
        cart_cart.save()

        response_mesage = {'error':False,'message':"Product add to card successfully"}
        return Response(response_mesage)


class SubQuantity(views.APIView):
    authentication_classes= [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        product_id = request.data['id']
        product_obj=Product.objects.get(id=product_id)

        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
        cartprod_uct.quantity -=1
        cartprod_uct.subtotal -=product_obj.selling_price
        cartprod_uct.save()
        cart_cart.total -=product_obj.selling_price
        cart_cart.save()

        response_mesage = {'error':False,'message':"Product sub to card successfully"}
        return Response(response_mesage)
        


class DeleteCartProduct(views.APIView):
    authentication_classes= [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        product_id = request.data["id"]
        product_obj = Product.objects.get(id = product_id)


        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        cartProduct = cart_cart.cartproduct_set.filter(product = product_obj)
        cartProduct.delete()

        new_all_products = cart_cart.cartproduct_set.all()
        new_total = 0
        for singleProduct in new_all_products:
            new_total+=singleProduct.subtotal
        cart_cart.total = new_total
        cart_cart.save()

        response_mesage = {'error':False,'message':"Product delet to card successfully"}
        return Response(response_mesage)

class DeleteFullCart(views.APIView):
    authentication_classes= [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        try:
            cart_id=request.data["id"]
            cart_obj=Cart.objects.get(id=cart_id)
            cart_obj.delete()
            response_msg={"error":"false","msg":"Uncomplete Cart has been succesfully deleted"}
        except:
            response_msg={"error":"false","msg":"Uncomplete Cart has not been deleted"}

        return Response(response_msg)

class Registerview(views.APIView):

    def post(self,request):

        serializer=UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"error":False, "msg": f"User is created for {serializer.data['username']} "})
        return Response({"error":True,"message":"something is wrong!!!!!"})
        

        

       


        









                






            





        
        
        
         








