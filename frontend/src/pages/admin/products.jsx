import React, { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { productFormControls } from "../../config";
import ProductImageUpload from "../../components/admin/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../../store/adminSlice/productSlice";
import { toast } from "react-toastify";
import AdminProductTile from "../../components/admin/productTile";

const initialState = {
  image: null,
  productName: "",
  price: "",
  discountPrice: "",
  description: "",
  quantity: 0,
  inStock: true,
};
const AdminProducts = () => {
  const [formData, setFormData] = useState(initialState);
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(true);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProduct);

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log(data, "data");
            if (data?.payload?.success) {
              toast.success(data.payload.message);
              dispatch(getAllProducts());
              setCurrentEditedId(null);
              setOpenProductAddDialog(false);
              setFormData(initialState);
            } else {
              toast.error(data.payload.message);
            }
          }
        )
      : dispatch(
          addProduct({
            ...formData,
            image: imageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast.success(data.payload.message);
            dispatch(getAllProducts());
            setOpenProductAddDialog(false);
            setImageFile(null);
            setFormData(initialState);
          } else {
            toast.error(data.payload.message);
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(getAllProducts());
      } else {
        toast.error(data.payload.message);
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button
          onClick={() => setOpenProductAddDialog(true)}
          className="bg-pink-500 hover:bg-pink-600 cursor-pointer"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((product) => (
          <AdminProductTile
            currentEditedId={currentEditedId}
            setFormData={setFormData}
            setOpenProductAddDialog={setOpenProductAddDialog}
            setCurrentEditedId={setCurrentEditedId}
            product={product}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <Sheet
        open={openProductAddDialog}
        onOpenChange={() => {
          setOpenProductAddDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Update Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 py-3">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              currentEditedId={currentEditedId}
            />
            <CommonForm
              formControls={productFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update Product" : "Add Product"}
              onSubmit={onSubmit}
              isDisable={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
