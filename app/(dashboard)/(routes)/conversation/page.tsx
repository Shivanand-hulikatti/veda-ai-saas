"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    prompt: z.string().min(1, { message: "Prompt is required." }),
});

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/conversation', {
                messages: newMessages,
            });

            const assistantMessage: ChatMessage = {
                role: "assistant",
                content: response.data.content,
            };

            setMessages(current => [...current, userMessage, assistantMessage]);
            form.reset();
        } catch (error: any) {
            console.error("Error submitting form:", error.message || error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <Heading
                title="Conversation"
                description="Our most advanced conversation model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="flex-1 overflow-y-auto px-4 lg:px-8">
                <div className="space-y-4 mt-4">
                    {messages.map((message, index) => (
                        <div 
                            key={index}
                            className={cn(
                                "p-4 rounded-lg max-w-[80%]",
                                message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
                            )}
                        >
                            <p className="text-sm">
                                {message.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-4 lg:px-8 py-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-2 flex items-center"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Type your message here..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="ml-2"
                        >
                            Send
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ConversationPage;
