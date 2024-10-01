import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailPayloadCombined } from "./email-payload-combined.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayload = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailPayloadCombined,
    "name" | "frontURL" | "actionToken"
  >;

  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombined,
    "name" | "frontURL" | "actionToken"
  >;

  [EmailTypeEnum.OLD_VISIT]: PickRequired<
    EmailPayloadCombined,
    "name" | "frontURL"
  >;

  [EmailTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombined, "name">;

  [EmailTypeEnum.LOGOUT_COMPLETELY]: PickRequired<EmailPayloadCombined, "name">;
};
