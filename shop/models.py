from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    prouser=models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile/", blank=True, null=True)

    def __str__(self):
        return self.prouser.username

class Category(models.Model):
    title = models.CharField(max_length=200)
    date= models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=200)
    date= models.DateField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    image = models.ImageField(upload_to="products/")
    marcket_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    description = models.TextField()

    def __str__(self):
        return self.title

class Cart(models.Model):
    customer= models.ForeignKey(Profile, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complete= models.BooleanField(default=False)
    date= models.DateField(auto_now_add=True)

    def __str__(self):
        return  f"CartId =={self.id}==Complete=={self.complete}"

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE) # additional input >>>> like oject 
    product = models.ManyToManyField(Product) # additional input>>>> array
    price =models.PositiveIntegerField()
    quantity =models.PositiveIntegerField()
    subtotal =models.PositiveIntegerField()

    def __str__(self):
        return f"Cart=={self.cart.id}==CartProduct{self.id}==Quantity{self.quantity}"

ORDER_STATUS={
    ("Order Recieved","Order Recieved"),
    ("Order Processing","Order Processing"),
    ("On the way","On the way"),
    ("Order Complete","Order Complete"),
    ("Order Canceled","Order Canceled"),
}

class Order(models.Model):
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    address = models.CharField(max_length=250)
    mobile = models.CharField(max_length=16)
    email = models.CharField(max_length=100)
    total = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    orderstatus = models.CharField(max_length=30, choices=ORDER_STATUS, default="Order Recieved")
    date = models.DateField(auto_now_add=True)
    payment = models.BooleanField(default=False)

    def __str__(self):
        return f"Order=={self.id}{self.cart}"




    