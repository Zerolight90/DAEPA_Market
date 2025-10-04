"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(4, { message: "비밀번호는 4자 이상이어야 합니다." }),
});

const KakaoIcon = () => <div className="w-5 h-5 bg-yellow-400 rounded-full mr-2" />
const NaverIcon = () => <div className="w-5 h-5 bg-green-500 rounded-full mr-2" />

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("isLoggedIn")) {
      form.setValue("email", "ex01@exam.com");
      form.setValue("password", "1111");
      // Programmatically submit the form
      form.handleSubmit(onSubmit)();
    }
  }, []); // Run only once on mount

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email === "ex01@exam.com" && values.password === "1111") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", "테스트유저");
      toast.success("로그인 성공!");
      router.push("/");
    } else {
      toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">대파마켓 로그인</CardTitle>
            <CardDescription>
              가입하신 이메일과 비밀번호를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="ex01@exam.com" {...field} className="pl-10" />
                        </FormControl>
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
                        <div className="flex items-center">
                            <FormLabel>비밀번호</FormLabel>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                비밀번호 찾기
                            </Link>
                        </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="1111" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </form>
            </Form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">또는</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full"><KakaoIcon />카카오 로그인</Button>
                <Button variant="outline" className="w-full"><NaverIcon />네이버 로그인</Button>
            </div>
            <div className="mt-6 text-center text-sm">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="underline font-bold">
                회원가입
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
