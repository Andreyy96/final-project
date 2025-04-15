import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailPayloadCombined } from "./email-payload-combined.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayload = {
  [EmailTypeEnum.ACTIVATE]: PickRequired<
    EmailPayloadCombined,
    "frontUrl" | "actionToken"
  >;

  [EmailTypeEnum.RECOVERY_PASSWORD]: PickRequired<
    EmailPayloadCombined,
    "frontUrl" | "actionToken"
  >;
};
