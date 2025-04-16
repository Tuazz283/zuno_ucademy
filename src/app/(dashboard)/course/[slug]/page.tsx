import PageNotFound from "@/app/not-found";
import { IconCheck, IconPlay } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { courseTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const data = await getCourseBySlug({ slug: params.slug });
  //   console.log("Data", data);
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED)
    return <PageNotFound></PageNotFound>;
  const videoId = data.intro_url?.split("v=")[1];
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10">
      <div>
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <div>
              <iframe
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="HÀNH LÝ TRÊN TAY - KIỀU CHI | OFFICIAL MUSIC VIDEO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          ) : (
            <Image
              src={data.image}
              alt="Course thumbnail"
              fill
              className="object-cover rounded-lg"
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal mb-5">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5">
            <BoxInfor title="Bài học">100</BoxInfor>
            <BoxInfor title="Lượt xem">{data.views.toLocaleString()}</BoxInfor>
            <BoxInfor title="Trình độ">{courseTitle[data.level]}</BoxInfor>
            <BoxInfor title="Thời lượng">100</BoxInfor>
          </div>
        </BoxSection>
        <BoxSection title="Yêu cầu">
          <div className="leading-normal mb-10">
            {data.info.requirements.map((r, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                  <IconCheck></IconCheck>
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Lợi ích">
          <div className="leading-normal mb-10">
            {data.info.benefits.map((b, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                  <IconCheck></IconCheck>
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Q.A">
          <div className="leading-normal mb-10">
            {data.info.qa.map((qa, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={qa.question}>
                  <AccordionTrigger>{qa.question}</AccordionTrigger>
                  <AccordionContent>{qa.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </BoxSection>
      </div>
      <div>
        <div className="bg-white rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary text-xl font-bold">
              {data.price}
            </strong>
            <span className="text-slate-400 line-through text-sm">
              {data.sale_price}
            </span>
            <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
              {Math.floor((data.price / data.sale_price) * 100)}%
            </span>
          </div>
          <h3 className="font-bold mb-3 text-black text-sm">Khóa học gồm có</h3>
          <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconPlay className="size-5 "></IconPlay>
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-5 t"></IconPlay>
              <span>Video Full HD</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-5 "></IconPlay>
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-5 "></IconPlay>
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant="primary" className="w-full">
            Mua khóa học
          </Button>
        </div>
      </div>
    </div>
  );
};

function BoxInfor({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5 mb-10 font-normal">
      <h4 className="text-sm text-slate-400">{title}</h4>
      <h3 className="font-bold text-black">{children}</h3>
    </div>
  );
}
function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {" "}
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className=" =mb-10">{children}</div>
    </div>
  );
}
export default page;
