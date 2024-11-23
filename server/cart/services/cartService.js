import cartModel from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { cartError } from '../helpers/constants.js';
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import couponService from '../../coupons/services/couponService.js';

import productService from '../../products/services/productService.js';
import packageService from '../../package/services/packageService.js';
import orderService from '../../orders/services/orderService.js';
import { PAYMENT_STATUS, PAYMENT_METHODS } from '../../orders/helpers/constants.js';
import { productsErrors } from '../../products/helpers/constants.js';
import { packageErrors } from '../../package/helpers/constants.js';
import Fuse from 'fuse.js';
import axios from 'axios';

class CartService {
  async listCart(query = {}, userId) {
    const options = getPaginationAndSortingOptions(query);
    const { limit, page, sort, sortBy, search, minPrice, maxPrice, ..._query } = query;

    if (minPrice || maxPrice) {
      _query['price.finalPrice'] = {};
      if (minPrice) {
        _query['price.finalPrice'].$gte = minPrice;
      }
      if (maxPrice) {
        _query['price.finalPrice'].$lte = maxPrice;
      }
    }

    _query['userId'] = userId;
    let carts = await cartModel.find(_query, options, {});
    const count = await cartModel.countDocuments(_query);

    if (search) {
      const fuse = new Fuse(carts, {
        keys: ['name', 'description', 'tags'],
        threshold: 0.3
      });
      carts = fuse.search(search).map(result => result.item);
    }

    return {
      carts,
      options: {
        ...options,
        count
      }
    };
  }

  async AddProductToCart(productId, quantity, userId) {
    try {
      const product = await productService.getProduct(productId);
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.products.findIndex(p => p.productId == productId);

        if (index > -1) {
          cart.products[index].quantity += quantity;
          cart.products[index].totalPrice =
            cart.products[index].quantity * product.product.price.finalPrice;
        } else {
          cart.products.push({
            productId,
            quantity,
            totalPrice: quantity * product.product.price.finalPrice
          });
        }

        cart.totalPrice = this.calculateTotalPrice(cart);
        await cartModel.update({ userId }, cart);
      } else {
        cart = await cartModel.create({
          userId,
          products: [
            { productId, quantity, totalPrice: quantity * product.product.price.finalPrice }
          ],
          totalPrice: quantity * product.product.price.finalPrice
        });
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async AddPackageToCart(packageId, userId, quantity) {
    try {
      const Package = await packageService.getPackage(packageId);
      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });


      if (cart) {
        const index = cart.packages.findIndex(p => p.packageId == packageId);

        if (index > -1) {
          cart.packages[index].quantity += quantity;
          cart.packages[index].totalPrice =
            cart.packages[index].quantity * Package.Package.price.finalPrice;
        } else {
          
          cart.packages.push({
            packageId,
            quantity,
            totalPrice: quantity * Package.Package.price.finalPrice
          });
        }

        cart.totalPrice = this.calculateTotalPrice(cart);
        await cartModel.update({ userId }, cart);
      } else {

        cart = await cartModel.create({
          userId,
          packages: [
            { packageId, quantity, totalPrice: quantity * Package.Package.price.finalPrice }
          ],
          totalPrice: quantity * Package.Package.price.finalPrice
        });
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async increaseProductQuantity(productId, userId) {
    return this.AddProductToCart(productId, 1, userId);
  }

  async decreaseProductQuantity(productId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.products.findIndex(p => p.productId == productId);
      if (index === -1 || cart.products[index].quantity <= 1) {
        throw new ErrorResponse(
          productsErrors.INVALID_QUANTITY.message,
          BAD_REQUEST,
          productsErrors.INVALID_QUANTITY.code
        );
      }

      cart.products[index].quantity -= 1;
      cart.products[index].totalPrice =
      cart.products[index].quantity * ((await productService.getProduct(productId)).product.price.finalPrice)
      cart.totalPrice = this.calculateTotalPrice(cart);
      await cartModel.update({ userId }, cart);

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async removeProductFromCart(productId, userId) {
    try {
      const isProductIdValid = await productService.getProduct(productId);
      if (!isProductIdValid) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.products.findIndex(p => p.productId == productId);
      if (index > -1) {
        cart.products.splice(index, 1);
        cart.totalPrice = this.calculateTotalPrice(cart);
        return await cartModel.update({ userId }, cart)
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async removePackageFromCart(packageId, userId) {
    try {

      const isPackageIdValid = await packageService.getPackage(packageId);
      if (!isPackageIdValid) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.packages.findIndex(p => p.packageId == packageId);
      if (index > -1) {
        cart.packages.splice(index, 1);
        cart.totalPrice = this.calculateTotalPrice(cart);
        return await cartModel.update({ userId }, cart);
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProductInCart(productId, userId, newQuantity, newPrice) {
    try {
      const product = await productService.getProduct(productId);
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.products.findIndex(p => p.productId == productId);
        if (index > -1) {
          if (newQuantity) {
            cart.products[index].quantity = newQuantity;
          }

          if (newPrice) {
            cart.products[index].totalPrice = cart.products[index].quantity * newPrice;
          } else {
            cart.products[index].totalPrice =
              cart.products[index].quantity * product.product.price.finalPrice;
          }

          cart.totalPrice = this.calculateTotalPrice(cart);
          await cartModel.update({ userId }, cart);
        } else {
          throw new ErrorResponse(
            productsErrors.PRODUCT_NOT_FOUND.message,
            BAD_REQUEST,
            productsErrors.PRODUCT_NOT_FOUND.code
          );
        }
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updatePackageInCart(packageId, userId, newQuantity, newPrice) {
    try {
      const Package = await packageService.getPackage(packageId);
      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.packages.findIndex(p => p.packageId == packageId);
        if (index > -1) {
          if (newQuantity) {
            cart.packages[index].quantity = newQuantity;
          }

          if (newPrice) {
            cart.packages[index].totalPrice = cart.packages[index].quantity * newPrice;
          } else {
            cart.packages[index].totalPrice =
              cart.packages[index].quantity * Package.Package.price.finalPrice;
          }

          cart.totalPrice = this.calculateTotalPrice(cart);
          await cartModel.update({ userId }, cart);
        } else {
          throw new ErrorResponse(
            packageErrors.PACKAGE_NOT_FOUND.message,
            BAD_REQUEST,
            packageErrors.PACKAGE_NOT_FOUND.code
          );
        }
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async decreasePackageQuantity(packageId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.packages.findIndex(p => p.packageId == packageId);
      if (index === -1 || cart.packages[index].quantity <= 1) {
        throw new ErrorResponse(
          packageErrors.INVALID_QUANTITY.message,
          BAD_REQUEST,
          packageErrors.INVALID_QUANTITY.code
        );
      }

      cart.packages[index].quantity -= 1;
      cart.packages[index].totalPrice =
        cart.packages[index].quantity *
        (await packageService.getPackage(packageId)).price.finalPrice;
      cart.totalPrice = this.calculateTotalPrice(cart);
      await cartModel.update({ userId }, cart);

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async increasePackageQuantity(packageId, userId) {
    return this.AddPackageToCart(packageId, userId, 1);
  }

  calculateTotalPrice = cart => {
    let total = 0;
    cart.products.forEach(product => {
      total += product.totalPrice;
    });
    cart.packages.forEach(pkg => {
      total += pkg.totalPrice;
    });
    return total;
  };

  async applyCoupon(code, userId) {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      throw new ErrorResponse(
        cartError.CART_NOT_FOUND.message,
        BAD_REQUEST,
        cartError.CART_NOT_FOUND.code
      );
    }

    const coupon = await couponService.getCoupon(code);

    if (!coupon) {
      throw new ErrorResponse(
        cartError.COUPON_NOT_FOUND.message,
        BAD_REQUEST,
        cartError.COUPON_NOT_FOUND.code
      );
    }

    const discount = await couponService.applyCoupon(code, cart , userId);
    cart.totalPrice -= discount;
    await cartModel.update({ userId }, cart);
  }










async checkOut(userId, body) {
  // Retrieve the user's cart
  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    throw new ErrorResponse(
      cartError.CART_NOT_FOUND.message,
      BAD_REQUEST,
      cartError.CART_NOT_FOUND.code
    );
  }

  // Determine the payment status based on the method
  let paymentStatus =
    body['paymentMethod'] === PAYMENT_METHODS['COD'] || body['paymentMethod'] === PAYMENT_METHODS['BANKAK']
      ? PAYMENT_STATUS['PENDING']
      : PAYMENT_STATUS['SUCCESS'];

  body.paymentStatus = paymentStatus;

  // Prepare the order data
  const order = {
    user: userId,
    cart: {
      products: cart.products,
      packages: cart.packages,
      totalPrice: cart.totalPrice
    },
    ...body
  };

  // Create the order in your system
  const createdOrder = await orderService.createOrder(order);

  // Prepare shipment data
  const shipmentData = {
    serviceId: 1, // Example service ID, replace with actual service ID if needed
    recipientZoneId: 123, // Replace with correct zone ID
    recipientSubzoneId: 456, // Replace with correct subzone ID
    recipientPhone: "123456789", // Replace with the recipient's phone number
    recipientMobile: "987654321", // Replace with the recipient's mobile number
    recipientAddress: body.address.street + ", " + body.address.city, // Format the address as needed
    // Adjusting the delivery date format (only date part)
    deliveryDate: new Date().toISOString().split('T')[0], // Format to 'YYYY-MM-DD'
    weight: cart.totalWeight || 0, // Assuming numeric weight value
    price: cart.totalPrice, // Using "price" instead of "totalPrice"
    // Adjust orderId and products fields based on the API schema
    shipmentProducts: [
      ...cart.products.map(product => ({
        productId: parseInt(product._id, 10), // Ensure the productId is an integer (if required)
        quantity: product.quantity,
        price: product.totalPrice // Assuming price is the total price of the product
      })),
      ...cart.packages.map(P => ({
        packageId: P._id, // Use packageId if needed
        quantity: P.quantity,
        price: P.totalPrice // Assuming price is the total price of the package
      }))
    ], // Example, replace 'shipmentProducts' with correct field name if needed
    notes: "Special handling required", // Example if 'notes' is required or other extra info
  };

  // Make an API call to the shipment company (example using GraphQL)
  try {
    const response = await axios.post('https://barq.accuratess.com:8001/graphql', {
      query: `
        mutation SaveShipment($input: ShipmentInput!) {
          saveShipment(input: $input) {
            status {
              code
              name
            }
            trackingUrl
          }
        }
      `,
      variables: {
        input: shipmentData
      }
    });

    // Handle the response from the shipment company
    if (response.data && response.data.data && response.data.data.saveShipment) {
      if (response.data.data.saveShipment.status) {
        console.log('Shipment successfully created with status:', response.data.data.saveShipment.status.name);
      } else {
        console.error('Failed to create shipment:', response.data.data.saveShipment);
      }

      if (response.data.data.saveShipment.trackingUrl) {
        console.log('Tracking URL:', response.data.data.saveShipment.trackingUrl);
      } else {
        console.error('No tracking URL available');
      }
    } else {
      console.error('Unexpected response format from shipment company:', response.data);
    }
  } catch (error) {
    console.error('Error sending order to shipment company:', error);
  }

  // Clean up the cart after the order is placed
  await cartModel.delete({ userId });

  // Return the created order
  return createdOrder;
}

  
  

  
  
  

  
}

export default new CartService();
