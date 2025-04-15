import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstants = {
  [EmailTypeEnum.ACTIVATE]: {
    subject: "Activate account",
    template: "activate",
  },
  [EmailTypeEnum.RECOVERY_PASSWORD]: {
    subject: "Recovery password",
    template: "recovery-password",
  },
};
