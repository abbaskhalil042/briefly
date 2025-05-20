import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

export function AccordionDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full p-10"
    >
      <Accordion type="single" collapsible >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            What is Briefly?
          </AccordionTrigger>
          <AccordionContent>
            Briefly is a fast and intuitive app designed to help you capture and
            organize your thoughts instantly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer">
            How do I create a new note?
          </AccordionTrigger>
          <AccordionContent>
            Simply click the “New Note” button, type your thoughts, and save.
            Your notes are automatically organized by date and tags.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="cursor-pointer">
            Can I sync my notes across devices?
          </AccordionTrigger>
          <AccordionContent>
            Yes! Briefly syncs your notes securely across all your devices, so
            you can access them anytime, anywhere.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="cursor-pointer">
            Is my data secure?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. We use end-to-end encryption to protect your data and
            keep your information private.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="cursor-pointer">
            Does Briefly support offline access?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can create and edit notes offline. Changes will sync
            automatically when you reconnect to the internet.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
