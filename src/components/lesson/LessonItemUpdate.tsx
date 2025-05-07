// "use client";
// import { ILesson } from "@/database/lesson.model";
// import React, { useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { updateLesson } from "@/lib/actions/lesson.actions";
// import { toast } from "react-toastify";
// import { Editor } from "@tinymce/tinymce-react";
// import { editorOptions } from "@/constants";
// import { useTheme } from "next-themes";

// const formSchema = z.object({
//   slug: z.string().optional(),
//   duration: z.number().optional(),
//   video_url: z.string().optional(),
//   content: z.string().optional(),
// });
// const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
//   const editorRef = useRef<any>(null);
//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       slug: lesson.slug,
//       duration: lesson.duration,
//       video_url: lesson.video_url,
//       content: lesson.content,
//     },
//   });
//   useEffect(() => {
//     setTimeout(() => {
//       if (editorRef.current) {
//         editorRef.current.setContent(lesson.content);
//       }
//     }, 1000);
//   }, [lesson.content]);
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       const res = await updateLesson({
//         lessonId: lesson._id,
//         updateData: values,
//       });
//       if (res?.success) {
//         toast.success("Cập nhật bài học thành công!");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//     }
//   }
//   const { theme } = useTheme();
//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-2 gap-8">
//             <FormField
//               control={form.control}
//               name="slug"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Đường dẫn</FormLabel>
//                   <FormControl>
//                     <Input placeholder="bai-1-tong-quan" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="duration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Thời lượng</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="bai-1-tong-quan"
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="video_url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Video URL</FormLabel>
//                   <FormControl>
//                     <Input placeholder="https://youtube.com/abcd" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div></div>
//             <FormField
//               control={form.control}
//               name="content"
//               render={({ field }) => (
//                 <FormItem className="col-start-1 col-end-3">
//                   <FormLabel>Nội dung</FormLabel>
//                   <FormControl>
//                     <Editor
//                       apiKey="7u3pe9flxquynllzfgxlubrhnzzfd95d9opk77dlskns0j5k"
//                       onInit={(_evt: any, editor: any) => {
//                         (editorRef.current = editor).setContent(
//                           lesson.content || ""
//                         );
//                       }}
//                       {...editorOptions(field, theme)}
//                       initialValue="Welcome to TinyMCE!"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex justify-end gap-5 items-center mt-8">
//             <Button type="submit">Cập nhật</Button>
//             <Link href="/" className="text-sm text-slate-600">
//               Xem trước
//             </Link>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default LessonItemUpdate;
"use client";

import { ILesson } from "@/database/lesson.model";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/constants";
import { useTheme } from "next-themes";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any>(null);
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug || "",
      duration: lesson.duration || 0,
      video_url: lesson.video_url || "",
      content: lesson.content || "",
    },
  });

  useEffect(() => {
    if (editorRef.current && lesson.content) {
      editorRef.current.setContent(lesson.content);
    }
  }, [lesson.content]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Lấy nội dung từ editor
      const content = editorRef.current?.getContent() || "";
      const updatedValues = { ...values, content };

      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: updatedValues,
      });

      if (res?.success) {
        toast.success("Cập nhật bài học thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài học:", error);
      toast.error("Cập nhật bài học thất bại.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn</FormLabel>
                  <FormControl>
                    <Input placeholder="bai-1-tong-quan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời lượng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/abcd"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Editor
                    apiKey="7u3pe9flxquynllzfgxlubrhnzzfd95d9opk77dlskns0j5k"
                    onInit={(_, editor) => {
                      editorRef.current = editor;
                      editor.setContent(lesson.content || "");
                    }}
                    {...editorOptions(form.getValues("content") || "", theme)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>

          <div className="flex justify-end gap-5 items-center mt-8">
            <Button type="submit">Cập nhật</Button>
            <Link href="/" className="text-sm text-slate-600">
              Xem trước
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LessonItemUpdate;
