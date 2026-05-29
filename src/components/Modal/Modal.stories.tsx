import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Modal title"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          This is the modal body content. Use it to present information, forms, or confirmations
          that require the user's attention before continuing.
        </Modal>
      </>
    );
  },
};
