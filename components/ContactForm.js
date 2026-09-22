"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BUSINESS_TYPES } from "@/lib/site";
import Button from "./Button";
import styles from "./ContactForm.module.css";

const INITIAL = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  businessType: "",
  productRequirement: "",
  targetMarket: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!values.companyName.trim()) errors.companyName = "Enter your company name.";
  if (!values.email.trim()) errors.email = "Enter your business email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone && !/^[0-9+\-\s()]{7,20}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (!values.country.trim()) errors.country = "Enter your country.";
  if (!values.businessType) errors.businessType = "Select a business type.";
  if (!values.message.trim() || values.message.trim().length < 12) {
    errors.message = "Please describe your requirement in a little more detail.";
  }
  return errors;
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preset = useMemo(
    () => ({
      productRequirement: searchParams.get("product") || "",
      message: searchParams.get("interest")
        ? `I would like to discuss a ${searchParams.get("interest")} opportunity.`
        : "",
    }),
    [searchParams]
  );

  const [values, setValues] = useState({ ...INITIAL, ...preset });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setServerMessage("Please review the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to send enquiry.");
      }
      setStatus("success");
      setServerMessage("Thank you. Your enquiry has been received and can now be routed to the business team.");
      setValues(INITIAL);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid}>
        <Field label="First Name" name="firstName" value={values.firstName} onChange={update} error={errors.firstName} required />
        <Field label="Last Name" name="lastName" value={values.lastName} onChange={update} error={errors.lastName} required />
        <Field label="Company Name" name="companyName" value={values.companyName} onChange={update} error={errors.companyName} required className={styles.full} />
        <Field label="Business Email" name="email" type="email" value={values.email} onChange={update} error={errors.email} required />
        <Field label="Phone Number" name="phone" type="tel" value={values.phone} onChange={update} error={errors.phone} />
        <Field label="Country" name="country" value={values.country} onChange={update} error={errors.country} required />
        <label className={styles.field}>
          <span>Business Type</span>
          <select name="businessType" value={values.businessType} onChange={update} aria-invalid={Boolean(errors.businessType)} required>
            <option value="">Select your business type</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.businessType ? <em>{errors.businessType}</em> : <em aria-hidden="true">&nbsp;</em>}
        </label>
        <Field label="Product / Requirement" name="productRequirement" value={values.productRequirement} onChange={update} error={errors.productRequirement} />
        <Field label="Target Market" name="targetMarket" value={values.targetMarket} onChange={update} error={errors.targetMarket} className={styles.full} />
        <label className={`${styles.field} ${styles.full}`}>
          <span>Message</span>
          <textarea name="message" rows="5" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} required />
          {errors.message ? <em>{errors.message}</em> : <em aria-hidden="true">&nbsp;</em>}
        </label>
      </div>
      <p className={status === "success" ? styles.success : status === "error" ? styles.error : styles.status} role="status">
        {serverMessage || "\u00a0"}
      </p>
      <Button type="submit" variant="gold" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}

function Field({ label, name, value, onChange, error, type = "text", required = false, className = "" }) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input type={type} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} required={required} />
      <em>{error || "\u00a0"}</em>
    </label>
  );
}
