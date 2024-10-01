import { removeOldPasswordsCronJob } from "./delete-old-passwords.cron";
import { removeOldTokensCronJob } from "./remove-old-tokens.cron";
import { sendEmailCronJob } from "./send-email.cron";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  sendEmailCronJob.start();
};
