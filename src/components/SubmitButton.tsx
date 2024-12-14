import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending, data } = useFormStatus();

  console.log("pending", pending);
  console.log(data);

  if (data) {
    for (const entry of data.entries()) {
      console.log(entry);
    }
  }

  return (
    <button
      type="submit"
      className="button mt-24"
      style={{ backgroundColor: `${pending ? "red" : "green"}` }}
    >
      Submit from separate component
    </button>
  );
}
