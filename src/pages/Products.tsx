import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  inStock: boolean;
}

interface CartItem {
  id?: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

// Mock products data
const productsData: Product[] = [
  {
    id: "prod-1",
    name: "LED Bulb 9W",
    image: "https://shop.bajajelectricals.com/cdn/shop/files/830443_P_default.png?v=1724651533",
    category: "lighting",
    brand: "Philips",
    price: 249,
    rating: 4.5,
    inStock: true
  },
  {
    id: "prod-2",
    name: "Smart Switch",
    image: "https://leccygenesis.com/cdn/shop/files/2nd-img_74358fbe-580d-4a1f-ae61-1e98554d42fa_1024x1024.jpg?v=1727782570",
    category: "switches",
    brand: "Havells",
    price: 599,
    rating: 4.2,
    inStock: true
  },
  {
    id: "prod-3",
    name: "MCB Circuit Breaker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbPMpoMJGf0CJuwQeoyZWk5i6ooMkzl2DvVw&s",
    category: "circuit-breakers",
    brand: "Legrand",
    price: 349,
    rating: 4.0,
    inStock: false
  },
  {
    id: "prod-4",
    name: "Copper Wire 1.5mm",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISBhUTExMVFhIWGCEaFhcXFhYXGhgZGhgaHRgiFxgYHiggGRolGxobITEhJSkrLjEuHSEzODMtNyguLisBCgoKDg0OGxAQGi0fHyYvLTAtKy0tLy0tLzIyKy0tLS0tLS0tLS01LS0tLS8tLS01LS0tLS0vLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAgCAwH/xABIEAACAQIEAgcFBgIGBwkAAAABAgADEQQFEiEGMRMiQVFhcYEHIzKRoRRCUpKxwWJyM1NzovDxCDSDssLR4RUWJCUmNmOCk//EABsBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/8QAKhEBAAICAAQFAwUBAAAAAAAAAAECAxEEEiExBRMiQXFRgfAUYbHR8aH/2gAMAwEAAhEDEQA/AMNiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIkjkmBWviWQkhujY0wLbuouAb9mxiZ0zEbnSOiWzhLJKdbDo7UzUZq7IF1ECyYd6gG1jctp7fu27ZY6/DWCGa1qSUCVGISmC1R7hDTLErY87kf4veO2SInSSmG1o3DMQpsfDn4T+TaOJeiOWYmnSoU6KsVpnR1LKmKq09rACzBeRuAzE25Gc/wD3Ry44AJ0RBqEEEMxdNTUwpDE2torU2sR2NMedVt+nux+JeMTwStWjVrYZilKnq2qEMS2sKqrYCycxqJJJXlKbi6ITFMgdXCkjUt9LWPNbgG03raJ7IrUmvd+MRE2akREBERAREQEREBERAREQEREBERAREQEROvDYGo1HpeiqNRVwrsoIF25LrsQrEXtcHyMDkiXA8OUKFejiahapgalRkNNtdKshUWtX6tlCuyglSbjlYmQ/FmX9DnTgBVVusqrcqt+arfewNwLkm1rzG4bcs62h4iJlqTpy7Fmjj0qDcowNr2uBzF+y429ZzRA0vIgKGMqkH3S4jDYlDsPdO7LUI7l0taTIV1z0KeVqRPeXplqT38biVfhVhiMjZOdRaVWge2yMvS0yfJqZUCWvDVOkznDOdlqt28vfImIU+hqkekpZf4dHB1/Pz6uPiBD0eMufxMLcwVxtVgfPrfSTuYY1UV2tbSrX5ABUWrTv62pDw6si80scbiiRsELEb7r9q1N9LznxlUvg6gdwNZpo1wOqGp0qj377dFUM17yk9pcXEOeDBcO0qVP+nqDWOY0A3CsR+La4HLUA3ZY5ixu1zuTJDiHMzic3qVeSk2QfhRdkHooHreR0uUryw52S/NYiIm6MnZhctqVMvq1hbo6WkMSbXLkhQvedibdwM45s3szycHhqiGvas7O+3KmSQxB5ginhqqg//N4zW9uWNt6U5p0xupTKtYgg2B3FtiAQfIgg+s+Ze+LsPTxnFWMqBzTw+GWxe2vUwbSqqNtySbXJ2UmUjD0HqVQqKzMeSqCxNhc2A35C8zE7YtXUvziImWpERAREQEREBERAREQERPqmhaoFHMmw3A3PieUD6w9B6lUKis7G9lUFibC5sBvsATNb4IT7Nw3pUlzVNPE0kdOjFSxXpUexLOA1I6QOwM9jylRXCZlldYotusVcoOsCQp0leRbZiLoSLEi5B3nsmz7D4lBSJGHrhroG6qCpf7h5BWbcoeTEkDdg0WS066J8VYifU7s+zSvWqGo79JSa+pSqn3bWB2vtpJGpbkA7i2sSmcQL0mUgke8pW1G99Q2Qm/3jYUzqtyl7zJWWm1ZVCsP9ZpjfS4H9IgvuCD1hfcE79pq2ZZdTADp8DKVsN7BlvpBHPYgqdtggAFxIsdt9U+WmukKHE+qiEOQeYNj6T5lpRIiIFs9m2M08RCmTZKosb8ttzf8A+msesvOOpNTweDIOnQlG/ZpahU6Nzfs6jUvlMt4ZqaeIsOb296gPkWAb6EzYOIaRq4OvTPZVN+8U61FQunxNRUt5GVs0dfld4Wenwjc2J6bEW+JsOy27mFJKn6mQHG+MFPKiqnerWqEfyBtF/wC4y+TSZOJVsw6VyQr0tZ7wOgKv6jo5R+O8SWzhVO3R0kBHczL0j/3nM1xxuYbZp5ayrkREtqBERA+kQlwACSTYAcyTytPSOHZMDwq++9CmKYP9mnX9HNEH/aeMxT2bZd03F1I2uKXvSO8pbox61Si+s1Titel4cNOmRpqfE1wLoWF7Dm1To6NFQB21L7C5FbNbrFVvh69JszH7BVfJqWHpj3lcnE4hybKicqXSN+EC7jtu9gCTaaHwXw4lHAe56QBlsao6lSq4PW6x/o6KAarA2uU1EnZY/A4OtWxa0gFog2JNjtYbsRfcqAdz1UGwub2mOIM+RKYwGF11WsFKout2C94HiSzFrLcneygSOZtfp7J+SuPrPWfz+f8AFK494Xw2jpcEQz6jrpoXYvqPNA3aDzRb2BudPwjO5pi5lTw+MPS1HNU7HD4Ry9UgH4a2JSwUDfqUuw2uJSuIsLUGKNc4Y4elWY9GnWsNNtQGrfbUDbx7JZxzOtSpZYje4REREkREREBERAREQEREBLJwfhrVzWqYVK9A3pnW6JpbqlmQMwDOqnkdutfsBFbm35DXwFTIcPRRqD1SmpqOpToJW9k13YsFuG6wHV5TTJbUJcVYtbUv3xuJTE0CVxCEW3DAIRtsHouTQfxNN0O3OVnNOHOkS7U0Yf1tG7p4akJ6SmNuxipkzUyHDOxvRp3vuFCqR4joKjsSPMRT4ZFKp0lI4mmf4HbfxZXB28GMpTM16w6daVmNSi+GXdPcuWIXq03+K3cjkWNvwkgEEEAkHblxVEUXZWFqDHfTzpsWJUpYX0lrstgdLagOatLF01Pk6lSCQKoAsx3vdEFg3O7KOfZP7mODVsOWBVttwfhZTYX6t7psA3b1Q4GpBfSl5i25jukyYqzTUd4ZZxPgdGKDjcMOsR8OrsK220stiNz94XOkyEmlDIzWrdBpd0a+n8dNxsyNbmwJBHeeXVcXoueZNWwmONKshUjkSpAYd63G43l+l4no5GXHNeqPiIkiJ90apSsGHNSCNr7g3Gx5zfM+dRVqVAbmrTRgOQYI7pRHq1Skb+UwCbVwetbHZRSFJbkUFQs3wI9IlF1Hu9zTcgb9baQ5qzOtLHD3iszuddEFiqJNeihO1Sm9K/bZq1cA/kIMofEWI6TPq7n71VjbuGo2Hym0UsiwtDEL02LOmi3UCp7wgAAAFgV33uTfblubjJOMMqWhmeqkSaFW7U9TamG+4Y9pB7e0ESSvD5KRzWjSPLxWPJPLWd+6BiImyMiJ+uGoNUxK00Us7sFVRzLMbADxJMDTfZThOjyOviPv1GFOntv1SoWx7b1qtL/8z3SY4qzUJURKTdYadDqgdutbR0aWJZzTFL1HcJ0rgvsmXYXAhwTTJeow3GtBsQeZUYnE3ueylIPD4+nTzmvmDkaabaKSbDr2sqoTYatI536qC+zOpFK3qtt0cfoppIZxjvsGR9EW6KvWUdJ11L005hdZ+Kqx3Nr6Ra1ySTS34kQYQ0MMlUId2WkdBqHvq1bGpUsew2E+quWVMTjnr1R1qjamqVerz/CjhVtbawLcpN5ZlSCiVp1ekccxSFFQO6/Tuwt/Ks39NWvLe6Ay7Lcwqrpw9BKSnnbTcX5atRLhvIDyko3suxr4NqlWsNagkK2vflYdez3PIWU7yZwa4roeoadhbdq9Wty71WmaanyQSQwxs6vWqUagU7gNjWZe+zIUC/l7Jjzp300z+mjXXbEYly9ouAX7YMRS0Mh6jmmrKpdeTgNvZx9Q3hKbLVZ3G1G1ZrOpIiJlqREQEREBERATowWNq0axak7IxUqSpIOlhZht2ETniAn7YfFVKbXR2Q96sVP0n4xAm6PFmNUi9dnt/WWqG3dqe7AeREvXs3zL/tDNThnBpAIajPTJ206QCmq5R7ldyxU2sVN9sql69j2b06HFWioBbEJ0QY/dbUrKL9zFQvmVkWSscszpNiy3iYiJahnNSngsralhFtq2dz8RsCALjYKBsFFgBYcgBKFkuL1VqmHr9ZKlwQb2uRz8D3EeYml5zg7oRbnMszekaWO1DsMoY79eq9aOii5tgTQzJ6Tc0a3mOw+osZyS6cc4YVcHTxS8wAlT/hP7eolLnTrO4c28anS1+y5KR45w4qoHUlrBhcBgjFCQedmA/Wegc7zpMLgnZd6jLYAWst73Pny+QnmfhfEGnxFQYcxUUfM2/eazxDiGeiCDfadHg8MZI+Jczjc045+VY4lzRqmMHnIDjL+gw5/hb9RJLHoOlBt/nOTjKl/5Xh27iw+ekyXi46S04O25qqMRE5TqOrLMvq4jHpRooXqubKo7Tz7dgALkk7ACadwBwe+Bz9sRjAoWijMtmB5D3rc7jSpCbjY1VI5SX/0fOGrUKuOcbt7ql/KCDUI8yAt/Bu+aFneTYXUxZ2QuQXCWOqxu1wwNtQ2J7gO4Snm4iK73MRHvKXFEc25ZHmeZu+MrkECqfdDuDnU1Y+K9JVrm5/qxPxXKm+zIalU0KFMWp6tFJzfdnJc6rudyRY8hY2Enc3wGCo5irUq9emyklSRTc6mLEtsF3Gpud/i2sQCM64+wiU81GnE1K7MNTdIN1BN1F77332sLbd+2MF65Y3XslvmiLa7ysK47LKVW5qq9Qdp6WrfycqCPnP3fjXBhdIaqV7hSU/I3Qj5zMIk/k1Y/VX9ohpbca5cWu9PF1CO/ov1qNUI9J+uK9o+AZbHAValuQfE1APyqbfSZfEz5NGs8Tk+q58RccJiMpehRwdPDq9rlGuSFYNvdbncd8pkRJIrERqEVrTadyRETLUiIgIiICIiAiIgIiICfVNytQMpIYG4INiCORB7DPmIHpXhnNRj+F6dfbWVtUHdUXZ9uzvHgRKnxZl3UJty5+UgPYrn/AEWbPhHPUri6eFRRv+ZQfyjvmk8R4LUl5y81OS7pYb89WWYKzYZ6D8mFv8f47JRsbhmpYpqbfEpsZec0omlj78hzkRxpQ1lK4GxARyO/mv0v8pcwX3GlXPTUq1h6pSurDmpBHobzaKxDYb0mJzY8or3y6m34qan5qP8AnO54bbraPhw/E6+ms/KuZgm4nHxSt+G0P4av0KtJXF0+tbxnBnq34Yq/wsp+tv3knGR3+EHA27fKizpy7BPXx9OjTF3qMFUeLGwv4Tmmqewbh7pc5fFsOpRGin41HG5H8qX/ADicHPl8rHN/z9ncrG502HKMvTB5DTop8NNAo7LkDcnxJuT5ysZ5jLKTeWbiDE6U090zXijHe7sJ4/JzZc0Y++u/z7r0arXaArVRUx7O5PRUgXc/wjsHieQ85nuY4xq2Oeq3xOb+XcB4AWHpLTxXiOhyZKI+Ot7yp/ID1B6kX9DKbPX8PijHjisOdE7mbEREnbEREBERAREQEREBERAREQEREBERAREQP0w1dqeIV0Ol0YMpHYQbg/Oemcox643hqlXW3vEuwG+l+Ti/g1xPMU0v2KcQGnm5wbn3Va7ID92ooubfzKPmBIOIx81d/RPgvy20l+K8u6rEdl7eMq+jpcseidr/AEIvpM1LinAXW8zLGUuizLbkZSxX5ZW81eaFDrUitUqRYg2M1XhTEh8no9pFMD8p0/tKFxNg7YgVBybY+YG3zH6GT3CGKtlSjuZh6bH956Hw+/r+zg8fTeP7p7GU7Ys37ZE5gt8oxK/wX/KQf2k1i964bvHdIvEU79Kn4qbD+6Zf4qN6czhJ1LOQLmw5z1XwFkIwHCVKiRZwuqp/aNu3nb4R4KJhPsg4eOM40p3F6dD3z93VI0D1cjbtAM9JZuQmBPeZ4zxPLrp7R1+/s9Lijqp3EWL6xMz3EsKuYWY2QXZyeQRRdr+FhaWLiTF9Uyg8SY3osmIHx1zpHhTX4vmbDxF5zfCcHPfnlJxVtVise6q57mRxOavVPJj1R3KNlHy+t5wRE9SqkREBERAREQEREBERAREQEREBERAREQEREBP3wGLejjUqobOjBlPiDcT8IgeoMLjUxvD9PEJ8NRNVu48mHmGBHpM84py7fl692958+w3PutVwLnnepSv3j41H0a380uPFGX9Unw2+s5eWvJd0sVuerIcxTpMtI7R+o5f8vUz8eFkJwLdy1B39o/6SVx1HRiSOw7SKy0mimIvyGk/Vh+86XhuX1xEudx+P0SujtdV3MjGe2ajx2/afeV41atDYz4ODetnlGmnxVGCjwubE+gufSdrPkjl3PZxMVJi0w0b2F8PHDcMGswHSYhtV+3o1JVPmdTeTCWPivHdUr3SYphKGBVFFlRQqjuCiw+glC4mx3WafOuPzeZ6Y72nf29npsNNdZVDNKxfE6RzvYeZmccU4wVM3YL8FP3aeS3ufVtR9Zds1xvQ5bVrX6wGlNxfW4IW1+dhdvSZlO74dg8vFv6quS3NeZIiJ0GpERAREQEREBERAREQEREBERAREQEREBERAREQO/Ic0fC5xSxCfFTcNbvH3h5EXHrPTGKZK+XrVQ6ldQyEdoIuPoZ5Ym8exnNen4Tagxu+Ha3O50P1l+uoDwWVuJpuu1jh76nSu8UYEhyey/wDlKtjjbBuR95bN5g3H+PGajxjg+qT3TNeiu7J3yrgyTjvFk/EUi9dOLhKvbEqO82/zmp+zXACrxQaxAIoU9j/G91H90PMgye6Ykj7ysefeJvvslw2nhpqpFjVqM3ovUHpdWPrL/iPE8vDTH16f3/zblYsW821kzqvZZmHEmKvVtL3n+KsCZl+NfXmFidr7+XbPH8LTz+I26uSeTHtVOO8XZqWHB+Ea3/mcbX8lt+aVKdebYw1szqVPxMSPAfdHoLCck9nEajUOfHYiImWSIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJf8A2K5p0PF/Rk9WuhW3ZqXrr9Aw9ZQJ35Fjvs+dUa2/u6isbdwYE/S4mt43WYbVnUxL0XxTQvhjMkxlPTj5sud2bDen6zKc6o/+I1do/ScqY6y6U9aqpmC9HnLHsIDfMb/pPRnCdHouFKCdopLfzK3b6kzzrxIh+0ofxDSPU7fvPTdClpwijuH6f5SDxLJNsOPX7/0p466ySqHFVe1MzLsxrMaFbQrM5QgBQSetsbAdw3mmcV4OrU6tNGY+A2HiTyUeJNpR+EajrxTo3BClmKnsK2A1A8jc/KQ+CYJ3zaZ4u3SIZnjcDVo1AtWm9NiLgOrKSO8BhynPNJ9sNC/2ep/MpPyI/wCKZtPSyqxOyIiYZIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAm8ezf2P4c5bSxWOvUeoA60QbIFYXXXbdmtY22A5bzB56z9kuYDEezzCN2onRH/AGRKD6KDA48+wxViqKdA2UBSRbsHpynHlPAHT1BVxBK0zv0YuGYHlqP3R4c/KaOeU56pMgjh6825TTnty6hUM99m+V1lQtTal0bBh0TkardjXvcfI+M+uIs4KYUrRGk9jX39D2SZxYlWzejcGbzhpOtxHRFzSreMz3EYmjpqVGIAtblfzA5+sgaeFNPibD1gNm1UmI8VLLfw2YfKSOnTiTOoUwfmCPNSCP0tJorppaUL7UaGrhgN/V1VPoQy/qRMjm18a0tfCeIHcob8rq36CYpFu5XsRETVsREQEREBERAREQEREBERAREQEREBERAREQEREBPSv+jyf/QTeGIe35acRA048pz1YiZYlHYnnK/mvwGIhhRMf/rfrOmj8E/kTeGJfGe/+3MT/Y1P9xphcRNbM1IiJq2IiICIiAiIgIiICIiB/9k=",
    category: "wires-cables",
    brand: "Finolex",
    price: 1299,
    rating: 4.8,
    inStock: true
  },
  {
    id: "prod-5",
    name: "LED Tube Light 20W",
    image: "https://4.imimg.com/data4/LF/DC/MY-13345152/t8-led-tube-light.jpg",
    category: "lighting",
    brand: "Crompton",
    price: 499,
    rating: 4.4,
    inStock: true
  },
  {
    id: "prod-6",
    name: "WiFi Smart Plug",
    image: "data:image/jpeg;base64,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",
    category: "smart-home",
    brand: "Anchor",
    price: 899,
    rating: 4.3,
    inStock: true
  },
  {
    id: "prod-7",
    name: "3-Pin Power Socket",
    image: "data:image/jpeg;base64,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",
    category: "switches",
    brand: "Philips",
    price: 199,
    rating: 4.1,
    inStock: true
  },
  {
    id: "prod-8",
    name: "Ceiling Fan 48\"",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHEBASDxISDw8QEg0PEg4SFxISEA8PFREWFhUSExMYHCggGB0lHhMTITEtJSkrLi4uGB8/ODMsNzQtLisBCgoKDg0OGxAQGysiICUtLS01LS0vLS0tLS0uLS0rLS0tLS0tLS0tLS0tLS0tLS0yLS0tLS0tLS0tLS0tKy0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwMEBQYIAgH/xAA+EAACAgEBBQQHBQYFBQAAAAAAAQIDEQQFBhIhMRMiQVEHQmFxgZGhMlKCsdEjM0NicpIUwdLT4RUWJESi/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAMCAQT/xAAgEQEBAQACAgMBAQEAAAAAAAAAAQIDESExEhNRQWFS/9oADAMBAAIRAxEAPwCcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGeXID0DxxhTA9g+ZGQPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjKc0VTxIC1slgoO/BcWrJYXx4QLuF5WjeYiN2CtG8DLxsyekzGQvLiGoAvQUI25KinkD2AAAAAAAAAAAAAAAAAAAAAAAAAAB5aPQAtrIltZAvNRZGmLlOUYRXWUmopfFmua7fLZ2lzxaumTXhVLtnny/Z5OyW+nO11qNPnmi0bcTHV7+aLUy4YO1/zcCjH6tP6GZrnDWx4oNNfVe87c6nuEsq37VoLWcItpcSxvg0cdZWvaC8y8q1yfiabde6yitqurxAkWnUqRcp5NB0W8CzzZtGzdqRuxzODLgJ5AAAAAAAAAAAAAAAAAAAAAAAAAHPvpT0mqs19r1PG48U3p4SeanQn3XUuieMcXjnqadVZg6k21sinbdUqtRBTg+afSUJeEoS8GQVvvuRbsCfF9umTxXqUu7LyhavVl9H9F6uPkl8I6z/Wu0ahw6G67nbzPSTSk+6+XPyI9jJweHya6ouabnB5Rf34qbpClx1kFKHNP6FtqNIR/uJvb/h2q7HmL5cyVq+HUxUovKZ4+Tj+F/wAXxrtp+v0OcmrbQrdOSUNRo+I17a2xu1T5E20a6jV9lzbUUvFvCXtbfQu9j7106bHFrKc5WILtZP4yjFowHpF2bPQupv8AdylNfjxlfTP1Nb2LfarFCD5N/ZxDD8PFcy3Hx/JjWunTm7W3KtpQXBdVbhJ5rmpcP9UesfikZ0jnc3Y6dPatJXdyNcopRasz15L5+wkYzy4mL1Hc67gACTQAAAAAAAAAAAAAAAAAAAAAFLVaaGshKu2MbK5pxlCSzGSfg0VQBCe//o8lsziu0/FZpllv1rNMvKX3oe3qvHzccyi6HiXz8GvNHWTWSLt/vRwrlK7Qw85T0sfB+MqPJ/y/Lyfo4+X+VLWPxE2m1DpaaJT3B3w7PFdrzF4XMia6qWleJdMtJ9Oa6prwZX0mpdDTTL6nc6rE8V1LXKNyUo80+aZ8lQpdSNtwN8c4qtfJ8k34EmxkpJNc0+afmjxbxc1eXtre9m51O8umnTN8DeJQtSy67F9mSXj5PzTZAGi3flsnaU9Jq48U6pNd3OLI4zGcM4eGsM6kNB30qjPbWwspd56/ieFmSjXHCfmu8/mzfFqyuancZzdHZUtHVW7G1hPgrfSOfF+3H5mxAGN7ur3XZOp0AAy6AAAAAAAAAAAAAAAAAAAAAAAAAADSd+dwq9vKVtCjXqWsyi+Veo/q+7Lyl8/NQbtHZ1my5yhZGUXB8MoyWJQl5SX5Pozqg17e7dOneSvnivURTUL0s8vuTXrR9nh4FuPl68VjWO/Tn7Z2qdEk0yZdxN61qIxqtlz9VsiTb27Op2RZZXiNUoJzlxySrVa/iQm+Tj+Xj44o7Irs00oylrtNWsrmpyuw/dTCRe3Op1U5LL26e6mib3ri21sT2PWP5xj+hQp37/6NVbHUVTsnVGThCtqTsx9nhk8Zi1z4vLw6EVaPbV22NovV2zmrZTcks8Sqhnu1QyuUUuXTnzfVsjji18m7udOlwYjdvbMdsVJp9+PdmvHPmZcjZZeq3L2AA46AAAAAAAAAAAAAAAAAAAAAAAAAAAAAMbtzYtW2q+C1c1ngsWOOttYeM9U1yafJrqc/+kDdCzdC6Dyp6e/icJpzxGxc5V8Oe6lnlzfLxeMvpI569NO0+02jwc7J6d1uMZfuoJwjJJrxz1a5devgU49al8M6krBbM28tLDsrk50LtJRUcRspslHHHXKUvNRbi+Tx4PmbNu7uVPb9naabWVRh1jZGtzU+6pPKU1wNcWHF9HkjKuycXlKMM/chCLXuklxL5mV2dtDU6b91ffU/OuyyD/8Alov3q+vCfj+pb2PGzczVx7a+FlUpcFjipqXPlxcHP8yV67FYk08ppNPzTOZa9dqtS4uy2drTynbiyWfbKWX9TetFvjrdRGEe7CdcbIwnWu7KTg4w44yyuTafl7Eie8bvmtZ1meImCc1Xzk0l5t4KT1la/iQ/uRFur39acVZpIWut9lKTvslxtZXFB8PR8OenMo/9+S/acOgozHnGTnNqKwuUljm+eOq6nJw127iVnr6l66/Moz2xRDrbFfMhveXbUdpxjOWnWmti1GMK3KfFW4tzlJcK8VXj8XtNbepz6tn9rNThn9cu3QFm8ulr63Q+aX5st7N8dHD+LF+5w/1EDq2T6V2P4f8AJUjC2fSm1/A19OWfsqbJ79aOP8RP5/5ItrPSHpIdG38J/wCgiSvZmrt+zpL3+CX6FxHd7Xz6aO/+yf6D6sHz0kqz0laePSMn8P1wWlnpRqj0qm/wx/3DRobo7Ss6aSfxaX5tFaG4m07P/WS986l+cx8OM702e70pv1Kfm0v1KuwPSBqdr6qqmFCkpyipc/sVZXHPKisYWXz9iNZr9HO0p9a64e+cP8pMkvcTdZbtUYs4J6qxt22RzjGe7XFvnhfV5M6uJPDs+VrZgAedUAAAAAAAAAKWp1ENJCU7ZRrrgsynNqMYrzbfQCqW2v19WzoOy+yNUF602ks+S837ERzvP6Wa6HKvZ8O2l0/xFiarXthDk5e94XvI41uv1O3rO01Fk7ZPpnpFeUUuUV7kiueK32xdyJH3j9JU7m69mRgkozlPWX54aorHOFSWZN55Lm8+qR5tBS25cpz7TUSa4ZaiaSvvlxPhlwQ7kFjhSj1Xi34ZLY+xZ3SjGMZTm+kY9f8Agk/d3ctabhs1UuOa5xpi32cf6n6z+nvLWZ4/LEt0jPQ+jy3WwVlcHKD8ccL+T93hky2k9Hdsetcl8CZoxUEkkklhJLkkvJH0n99/GvrRno9wZLrHHvwjY9l7mVafnb3v5Y5S/uXP5G0gzrl1XZiRrc9xtBNr9jhRWFFSny9qecp/Eu6N19Jp8cNXNdG52ya+MpMzIJ/K/rXUY9bD03XsKm/OUVJ/Uqw2XRDpTUvdCH6F2B3XVOFEIdIxXuSRU6AHAAAAAAAAAAAAAAAAAAAGi70ekzS7IzXp/wDyr+fKLxTF+2frfhz70RVtvbWr3qmnqJuUU8wqj3aq/wCmHn7Xl+06G12gp2hHgvqruh92yMZx+TRhHuPoYvMKnU+uISePk8pfAvx7xn3E9Z1UPbK3ZlbzawvNm9bB3Kd2G12cPvtc3/SjeNJsKnStNRcsdFLDS9ywZM7vm/5czx/qy2XsqrZceGqOG+s3zlL3svQCFvftUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z",
    category: "lighting",
    brand: "Havells",
    price: 1799,
    rating: 4.6,
    inStock: false
  },
  {
    id: "prod-9",
    name: "Electric Bell",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ-psuiSEkRG9zC3aRaqRTOnE2uU97DtxZXds3td7C8fo8ete9murRMi3wOcxOYV75fTsglLXH-aDz1NdrwN666knhj66S_dUP9Iq2rmq-fifOc1R_9Z6vPyrQ",
    category: "switches",
    brand: "Legrand",
    price: 149,
    rating: 4.0,
    inStock: true
  },
  {
    id: "prod-10",
    name: "Flexible Wire 2.5mm",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRIPjoDYqqyaoIYKorINrZqWVbuPkNLPpatyMwEBCAk9IzEnPvUFan-5QAtNOpq9pnk-3M5Kd2k28zXYYM-IB76xJ5cF_ae5Nbz8_633n6h1IH7yrTKeCbE",
    category: "wires-cables",
    brand: "Finolex",
    price: 1549,
    rating: 4.7,
    inStock: true
  }
];


const CartList = () => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      const { data, error } = await supabase.from('carts').select('*');
      if (error) {
        setError(error.message);
      } else {
        setCarts(data || []);
      }
    };
    fetchCarts();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Your Cart</h2>
      <ul className="space-y-2">
        {carts.map((cart) => (
          <li key={cart.id} className="border p-2 rounded">
            <div className="flex justify-between">
              <span>{cart.name}</span>
              <span>₹{cart.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


const Products = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all-categories");
  const [selectedBrand, setSelectedBrand] = useState<string>("all-brands");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAddToCart = async (product: Product) => {
    const { data, error } = await supabase
      .from('cart_items')
      .insert([
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          brand: product.brand,
        }
      ])
      .select();

    if (error) {
      console.error('Add to Cart Error:', error);
    } else {
      console.log('Item added to cart:', data);
    }
  };

  const filteredProducts = productsData.filter((product) => {
    // Filter by search term
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === "all-categories" || 
                           product.category === selectedCategory;
    
    // Filter by brand
    const matchesBrand = selectedBrand === "all-brands" || 
                         product.brand === selectedBrand;
    
    // Filter by price range
    const matchesPrice = product.price >= priceRange[0] && 
                         product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <AnimatedSection>
          <SectionHeading
            title="Browse Our Products"
            subtitle="Quality electrical products for all your needs"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Filters */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            <div className="space-y-6">
              {/* Cart List */}
              <CartList />
              
              {/* Search */}
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="switches">Switches & Sockets</SelectItem>
                    <SelectItem value="circuit-breakers">Circuit Breakers</SelectItem>
                    <SelectItem value="wires-cables">Wires & Cables</SelectItem>
                    <SelectItem value="smart-home">Smart Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Brand Filter */}
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select 
                  value={selectedBrand} 
                  onValueChange={setSelectedBrand}
                >
                  <SelectTrigger id="brand" className="mt-1">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-brands">All Brands</SelectItem>
                    <SelectItem value="Philips">Philips</SelectItem>
                    <SelectItem value="Havells">Havells</SelectItem>
                    <SelectItem value="Crompton">Crompton</SelectItem>
                    <SelectItem value="Legrand">Legrand</SelectItem>
                    <SelectItem value="Anchor">Anchor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Price Range</Label>
                  <span className="text-sm">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 2000]}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold">₹{product.price}</p>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <Button className="w-full mt-3" variant="outline">
                      View Details
                    </Button>
                    <Button
                      className="w-full mt-2"
                      variant="default"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;