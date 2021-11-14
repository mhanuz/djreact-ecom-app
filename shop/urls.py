from django.urls import path,include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register("category",CategoryView, basename="category")
router.register("cart",MyCart, basename="cart data ")
router.register("orders",Oldorders, basename="orders")



urlpatterns = [
    path('',include(router.urls)),
    path('product/',ProductView.as_view(), name="product"),
    path('product/<int:id>/',ProductView.as_view(), name="details"),
    path('profile/',ProfileView.as_view(), name="profile"),
    path('profileupdate/',ProfileUpdate.as_view(), name="profileupdate"),
    path('userdataupdate/',UserDataUpdate.as_view(), name="userupdate"),
    path('addtocart/',Addtocart.as_view(), name='add to cart'),
    path('addquantity/',AddQuantity.as_view(), name='add product quantity'),
    path('subquantity/',SubQuantity.as_view(), name='add product quantity'),
    path('deletecartproduct/',DeleteCartProduct.as_view(), name=" Cart Product Delete"),
    path('deletefullcart/',DeleteFullCart.as_view(), name=" Delete uncomplete cart"),
    path('register/',Registerview.as_view(), name=" user register"),
]
