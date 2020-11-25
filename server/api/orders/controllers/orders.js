"use strict";


const stripe = require("stripe")(
  process.env.SK_STRIPE
);

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve orders records
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.orders.search(ctx.query);
    } else {
      return strapi.services.orders.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a orders records
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orders.fetch(ctx.params);
  },

  /**
   * Count orders records
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.orders.count(ctx.query);
  },

  /**
   * Retrieve orders records
   *
   * @return {Object}
   */

  create: async (ctx) => {


      const {
        token,
        amount,
        fullName,
        address,
        postCode,
        confirmationEmail,
        city,
        items
      } = ctx.request.body;



    // Send charge to Stripe
    const charge = await stripe.charges.create({

      amount: amount * 100,
      currency: "gbp",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}, Name: ${fullName}, Address: ${address}`,
      source: token,
    });

    // Create order in database
    const order = await strapi.api.orders.services.orders.create({
      user: ctx.state.user._id,
      fullName,
      address,
      amount,
      items,
      postCode,
      confirmationEmail,
      city,
    });

    return order
  },
};
