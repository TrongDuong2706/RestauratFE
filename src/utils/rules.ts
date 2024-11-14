import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { omit } from 'lodash'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .matches(/^\S+@\S+\.\S+$/, 'Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  fullname: yup
    .string()
    .required('Nhập lại fullname là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự')
})

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Email là bắt buộc')
    .matches(/^\S+@\S+\.\S+$/, 'Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự')
})

export type loginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
