export const uploadFileSchema = {
  params: {
    type: "object",
    required: ["jobId"],
    properties: {
      jobId: {
        type: "string",
      },
    },
  },
};