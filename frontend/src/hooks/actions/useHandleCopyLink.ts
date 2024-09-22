import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "../../utils/capitalize";

export const handleCopyLink = (type: string, param: string | number) => {
  const profileUrl = `${window.location.origin}/${type}/${param}`;
  navigator.clipboard
    .writeText(profileUrl)
    .then(() => {
      toast.success(`${capitalizeFirstLetter(type)} link copied to clipboard!`);
    })
    .catch((err) => {
      toast.error(`Failed to copy the ${type} link`);
      console.error("Failed to copy: ", err);
    });
};
