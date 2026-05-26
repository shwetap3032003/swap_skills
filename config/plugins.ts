// config/plugins.ts

import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  "users-permissions": {
    config: {
      register: {
         allowedFields: ["location", "contactNo", "rating", "reviews", "swaps"],
      },
    },
  },
});

export default config;