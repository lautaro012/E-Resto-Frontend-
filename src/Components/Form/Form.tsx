import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { CardForm } from "../../Interfaces/Interfaces";
import { buttonclass } from "../../Style/Clases/Clases";
import { createProduct, getCategories, editProduct } from "../../redux/actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import "./Form.css";

export default function Form({
  newProduct,
  setFormData,
  formData,
  setcreateProduct,
  seteditProduct,
}: any) {
  let dispatch = useAppDispatch();
  const [oferta, setOferta] = useState<Boolean>(false);
  const [input, setInput] = useState<CardForm>({
    name: formData.name,
    img: formData.img,
    price: formData.price,
    description: formData.description,
    off: formData.off,
    stock: formData.stock,
    rating: formData.rating,
    category: formData.category,
  });

  const handleClose = (e: any) => {
    e.preventDefault();
    setcreateProduct(false);
    seteditProduct(false);
    setFormData({
      name: "test",
      img: "https://citizengo.org/sites/default/files/images/test_3.png",
      price: 0,
      description: "test-description",
      off: 0,
      stock: 0,
      rating: 3,
      category: "",
      newProduct: true,
    });
  };

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  let categories = useAppSelector((state: any) => state.categories);

  const handleOferta = () => {
    if (oferta) {
      setOferta(false);
      setInput({
        ...input,
        off: 0,
      });
    } else {
      setOferta(true);
    }
  };
  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (e: any) => {
    setInput({
      ...input,
      category: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    if (formData.newProduct) {
      return dispatch(createProduct(input));
    }
    dispatch(editProduct(input, formData._id));
    setInput({
      name: "test",
      img: "https://citizengo.org/sites/default/files/images/test_3.png",
      price: 0,
      description: "test-description",
      off: 0,
      stock: 0,
      rating: 3,
      category: "",
    });
  };
  return (
    <>
      <NavBar
        seteditProduct={seteditProduct}
        setcreateProduct={setcreateProduct}
        comeback={true}
      />
      <div className="form-conteiner">
        <button onClick={handleClose}>Cerrar</button>
        <aside>
          {newProduct ? (
            <h1> Inserta la informacion de tu Producto:</h1>
          ) : (
            <h1> Edita la informacion de tu Producto:</h1>
          )}
          <br></br>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  onChange={handleChange}
                  maxLength={15}
                  defaultValue={newProduct ? null : formData.name}
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombre
                </label>
              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  onChange={handleChange}
                  defaultValue={newProduct ? null : formData.description}
                  name="description"
                  id="description"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Descripcion
                </label>
              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="number"
                  onChange={handleChange}
                  defaultValue={newProduct ? null : formData.price}
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Precio
                </label>
              </div>
               {!oferta ? (
                  <button type="button" className={buttonclass} onClick={handleOferta}>
                    Agregar como oferta
                  </button>
                ) : (
                    <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="number"
                      onChange={handleChange}
                      defaultValue={newProduct ? null : formData.price}
                      name="off"
                      id="off"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="off"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Descuento
                    </label>
                    <button className={buttonclass} onClick={handleOferta}>Quitar Oferta</button>
                  </div>
                )}

              <div className="input-label">
                <select
                  defaultValue={formData.category}
                  onChange={handleSelect}
                  required
                >
                  <option>Seleccione una categoria</option>
                  {categories.map((cat: any) => {
                    return (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-label">
                <label>Stock:</label>
                <input
                  onChange={handleChange}
                  required
                  placeholder="Ingrese un stock inicial"
                  name="stock"
                  type="number"
                  min={0}
                  max={9999}
                  defaultValue={formData.stock}
                ></input>
              </div>
              <div className="input-label">
                <label>Imagen:</label>
                <input
                  onChange={handleChange}
                  required
                  name="img"
                  type="url"
                  defaultValue={formData.img}
                />
              </div>
              {newProduct ? (
                <button className={buttonclass} type="submit">
                  Crear
                </button>
              ) : (
                <button className={buttonclass} type="submit">
                  Editar
                </button>
              )}
            </form>
          </div>
        </aside>
        <aside>
          <Card formCard={true} comidaProps={input}></Card>
        </aside>
      </div>
    </>
  );
}
