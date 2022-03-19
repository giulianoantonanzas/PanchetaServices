const db = require("../models");
const ProductImage = require("../controllers/productimage");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 @description get all products paginated
 @param {number} currentPage current page on you stay
 @param {string} filter filter for a name to product
 */
const getAll = async (currentPage, filter) => {
  try {
    const {
      docs: data,
      pages,
      total,
    } = await db.Product.paginate({
      include: [
        {
          model: db.ProductImage,
          required: false,
        },
      ],
      ...(filter
        ? {
          where: {
            name: {
              [Op.like]: `%${filter}%`,
            },
          },
        }
        : null),
      page: currentPage,
      paginate: 10,
    });
    return {
      data,
      pages,
      total,
    };
  } catch (error) {
    return { code: 400, message: error };
  }
};

/**
 * @param {{name:string, description?:string, price?:number, stock?:number}} body
 * @param {{path:string, mimetype:string, fieldname:string}[]} files
 */
const create = async (body, files) => {
  try {
    if (!files) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    const newProduct = await db.Product.create(body);

    const createdImages = await ProductImage.create(newProduct.id, files);

    return {
      newProduct,
      createdImages,
      mercadoPagoRepsonse,
    };
  } catch (error) {
    return { code: 400, message: error };
  }
};

/**
 * @description remove product from id and images from productImages
 * @param {number} id
 */
const remove = async (id) => {
  try {
    await ProductImage.deleteImagesByProductId(id);

    const deletedProduct = await db.Product.destroy({
      where: {
        id,
      },
    });

    return deletedProduct
      ? { message: "success", code: 201 }
      : { message: "resource not found", code: 404 };
  } catch (error) {
    return { code: 400, message: error };
  }
};

/**
 * @description actualiza producto
 * @param {number} id
 * @param {{name?:string, description?:string, price?:number, stock?:number,productImages?:string[]}} body
 * @param {File[]} files
 */
const update = async (id, body, files) => {
  try {
    /**@type {{id:string, ProductImages?:{id:string,path:string, mimetype:string, fieldname:string}[]}} */
    const product = await findById(id);
    await db.Product.update(body, {
      where: { id },
    });

    //si obtengo nuevos archivos, los creo
    if (files) ProductImage.create(id, files);

    //si no encuentra la imagen en el listado, se elimina el archivo
    if (body?.productImages) {
      const imagesForRemove = product?.ProductImages?.filter(
        (productImage) =>
          !body.productImages?.find((imageId) => imageId == productImage.id)
      );

      if (imagesForRemove)
        imagesForRemove.forEach((image) => {
          ProductImage.removeImageById(image.id);
        });
    }

    return { code: 200, message: `product ${id} updated`, data: product };
  } catch (error) {
    return { code: 400, message: error };
  }
};

/**
 * @param {number} id
 * @description get a product by id
 */
const findById = async (id) => {
  try {
    return await db.Product.findByPk(id, {
      include: [
        {
          model: db.ProductImage,
          required: false,
        },
      ],
    });
  } catch (error) {
    return { code: 400, message: error };
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  findById,
};
