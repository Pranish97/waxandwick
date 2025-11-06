import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const AdminProductTile = ({ product ,setFormData, setOpenProductAddDialog, setCurrentEditedId ,handleDelete }) => {
  const hasDiscount = product?.discountPrice > 0;

  return (
    <Card className="group w-full mx-auto max-w-sm font-mons overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
      <div className="relative">
        <img
          className="w-full h-[300px] object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          src={product?.image}
          alt={product?.productName}
        />

        <Badge
          className={`${
            product.inStock ? "bg-pink-500" : "bg-red-600"
          } absolute top-3 left-3 text-white shadow-md px-3 py-1 rounded-full text-sm`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="px-3 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product?.productName}
        </h2>

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
          <span
            className={`${
              hasDiscount ? "line-through text-gray-400" : "text-gray-800"
            } text-base font-medium`}
          >
            ${product?.price}
          </span>
          {hasDiscount && (
            <span className="text-lg font-semibold text-pink-600">
              ${product?.discountPrice}
            </span>
          )}
          </div>

          <div className="flex items-center">
            <p className="font-semibold">Quantity: <span className="text-pink-500 font-bold">{product?.quantity}</span></p>
          </div>
        </div>
      </CardContent>

      <CardFooter className=" px-3 flex items-center justify-between">
        <Button onClick={() => {
          setOpenProductAddDialog(true)
          setCurrentEditedId(product?._id)
          setFormData(product)
        }} className="bg-pink-500 hover:bg-pink-600 cursor-pointer">Edit</Button>
        <Button onClick={() => handleDelete(product?._id)}  className="bg-red-500 hover:bg-red-600 cursor-pointer">Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
