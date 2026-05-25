// module.exports = {
//   async afterCreate(event) {
//     const { result } = event;

//     const ratedToId = result.ratedToId;
//     console.log("LIFECYCLE RUNNING:", ratedToId);

//     if (!ratedToId) return;

//     // all reviews of that user
//     const reviews = await strapi.entityService.findMany("api::review.review", {
//       filters: {
//         ratedToId,
//       },
//     });

//     // total
//     const total = reviews.reduce((sum, review) => {
//       return sum + Number(review.ratingCount || 0);
//     }, 0);

//     // average
//     const average =
//       reviews.length > 0 ? Number((total / reviews.length).toFixed(1)) : 0;

//     // update user
//     await strapi.db.query("plugin::users-permissions.user").update({
//       where: {
//         id: ratedToId,
//       },
//       data: {
//         rating: average,
//         reviews: reviews.length,
//       },
//     });
//   },
// };

export default {
  async afterCreate(event: any) {
    await updateUserRating(event.result);
  },

  async afterUpdate(event: any) {
    await updateUserRating(event.result);
  },
};

async function updateUserRating(result: any) {
  const ratedToId = Number(result.ratedToId);

  console.log("RATED TO:", ratedToId);

  if (!ratedToId) return;

  const reviews = await strapi.db.query("api::review.review").findMany({
  where: {
    ratedToId,
    publishedAt: {
      $notNull: true,
    },
  },
});

  const total = reviews.reduce((sum: number, review: any) => {
    return sum + Number(review.ratingCount || 0);
  }, 0);

  const average =
    reviews.length > 0 ? Number((total / reviews.length).toFixed(1)) : 0;

  await strapi.db.query("plugin::users-permissions.user").update({
    where: {
      id: ratedToId,
    },
    data: {
      rating: average,
      reviews: reviews.length,
    },
  });

  console.log("UPDATED USER RATING:", ratedToId, average, reviews.length);
}