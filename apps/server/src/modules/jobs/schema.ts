export const createJobSchema = {
  body: {
    type: "object",
    required: ["workflow"],
    properties: {
      workflow: {
        type: "string",
        enum: ["UC_SAP", "UC_PP_WH"],
      },
    },
  },
};