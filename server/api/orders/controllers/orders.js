"use strict";


const stripe = require("stripe")(
  "sk_test_51HZcgAIP5TcR6XA3RCpd7y04spOo9PoaWkNa2X2W3Z3IiFwlXvcE06UHUmxiuoJZuEYOSYFl2Bchd4yPohy9FbUe00e1rn6FYd"
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
        fullName,
        address,
        amount,
        items,
        postCode,
        token,
        city,
      } = ctx.request.body;



    // Send charge to Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "gpb",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
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
      city,
    });

    return order
  },
};
