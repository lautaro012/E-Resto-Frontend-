import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { CardForm } from "../../Interfaces/Interfaces";
import { buttonclass, inputForm, labelForm } from "../../Style/Clases/Clases";
import { createProduct, getCategories, editProduct } from "../../redux/actions";
import { Modal } from "flowbite-react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import "./Form.css";

export default function Form({
  newProduct,
  setFormData,
  formData,
  setcreateProduct,
  seteditProduct,
  setShowModal,
  showModal,
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

  const handleClose = () => {
    setcreateProduct(false);
    seteditProduct(false);
    setShowModal(false);
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
        setShowModal={setShowModal}
      />
      <Modal show={showModal} size="6xl" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="form-conteiner">
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
                      className={inputForm}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="name" className={labelForm}>
                      Nombre
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Descripcion
                    </label>
                    <textarea
                      rows={4}
                      onChange={handleChange}
                      defaultValue={newProduct ? null : formData.description}
                      name="description"
                      id="description"
                      required
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Describi de tu producto"
                    ></textarea>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="number"
                      onChange={handleChange}
                      defaultValue={newProduct ? null : formData.price}
                      name="price"
                      id="price"
                      min={0}
                      max={9999}
                      className={inputForm}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="price" className={labelForm}>
                      Precio
                    </label>
                  </div>
                  {!oferta ? (
                    <button
                      type="button"
                      className={buttonclass}
                      onClick={handleOferta}
                      id='button2'
                    >
                      Agregar como oferta
                    </button>
                  ) : (
                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="number"
                        onChange={handleChange}
                        defaultValue={newProduct ? null : formData.off}
                        name="off"
                        id="off"
                        className={inputForm}
                        placeholder=" "
                        required
                      />
                      <label htmlFor="off" className={labelForm}>
                        Descuento
                      </label>
                      <button id='button2' type="button" className={buttonclass} onClick={handleOferta}>
                        Quitar Oferta
                      </button>
                    </div>
                  )}

                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Seleccione una categoria
                  </label>
                  <select
                    id="countries"
                    defaultValue={formData.category}
                    onChange={handleSelect}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="number"
                      onChange={handleChange}
                      defaultValue={newProduct ? null : formData.stock}
                      name="stock"
                      id="stock"
                      className={inputForm}
                      placeholder=" "
                      required
                      min={0}
                      max={9999}
                    />
                    <label htmlFor="stock" className={labelForm}>
                      Stock
                    </label>
                  </div>

                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="url"
                      onChange={handleChange}
                      defaultValue={newProduct ? null : formData.img}
                      name="img"
                      id="img"
                      className={inputForm}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="img" className={labelForm}>
                      Imagen
                    </label>
                  </div>

                  {newProduct ? (
                    <button className={buttonclass} type="submit">
                      Crear
                    </button>
                  ) : (
                    <button  className={buttonclass} type="submit">
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
        </Modal.Body>
      </Modal>
    </>
  );
}
