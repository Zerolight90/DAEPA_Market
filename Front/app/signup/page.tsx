"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { User, Mail, Lock, Home, Phone } from "lucide-react"
import { useEffect } from "react"

declare global {
  interface Window {
    daum: any;
  }
}

const formSchema = z.object({
  username: z.string().min(2, { message: "아이디는 2자 이상이어야 합니다." }),
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  confirmPassword: z.string(),
  mainAddress: z.string().min(1, { message: "주소를 검색해주세요." }),
  detailAddress: z.string().optional(),
  gender: z.enum(["male", "female"], {
    required_error: "성별을 선택해주세요.",
  }),
  phoneNumber: z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/, {
    message: "유효한 전화번호를 입력해주세요 (예: 010-1234-5678).",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"], // path of error
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mainAddress: "",
      detailAddress: "",
      gender: "male",
      phoneNumber: "",
    },
  })

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else { // 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 글자가 '동' '로' '가'로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 상세주소 필드에 넣는다.
            // document.getElementById("sample6_extraAddress").value = extraAddr;
        
        } else {
            // document.getElementById("sample6_extraAddress").value = '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        // document.getElementById('sample6_postcode').value = data.zonecode;
        form.setValue("mainAddress", addr + extraAddr);
        // 커서를 상세주소 필드로 이동한다.
        // document.getElementById("sample6_detailAddress").focus();
      }
    }).open();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    alert("회원가입이 완료되었습니다! (콘솔을 확인하세요)")
  }

  const handleSendVerificationCode = () => {
    // Implement email verification logic here
    alert("인증번호 전송 기능은 아직 구현되지 않았습니다.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">대파마켓 회원가입</CardTitle>
            <CardDescription>
              몇 가지 정보만 입력하고 대파마켓의 회원이 되어보세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>아이디</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="아이디를 입력하세요" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="홍길동" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} className="pl-10 pr-28" />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
                          onClick={handleSendVerificationCode}
                        >
                          인증번호 전송
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>주소</FormLabel>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="주소 검색"
                        value={form.watch("mainAddress")}
                        readOnly
                        className="pl-10"
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={handleAddressSearch}>
                      주소 검색
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="mainAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="detailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="상세주소를 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>성별</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">남성</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">여성</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전화번호</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="010-1234-5678" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  가입하기
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center text-sm">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="underline font-bold">
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
