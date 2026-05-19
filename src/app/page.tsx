'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Globe, ShoppingCart, Smartphone, ArrowRight, Skull, Code2, Briefcase, MessageSquare, FileText, Palette, Gauge, Rocket, User, Gem } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ShinyText from '@/components/ui/ShinyText';
import Magnet from '@/components/ui/Magnet';
import CircularText from '@/components/ui/CircularText';
import ScrollFloat from '@/components/ui/ScrollFloat';
import LogoLoop from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss } from 'react-icons/si'

const stepsData = [
  {
    number: "01",
    icon: MessageSquare,
    types: {
      website: {
        title: { th: "วางโครงสร้าง & ดีไซน์บรีฟ", en: "Concept & Brand Brief" },
        desc: {
          th: "พูดคุยสไตล์การออกแบบ (CI), โครงสร้างเว็บไซต์ (Sitemap) หน้าเว็บคู่แข่ง/อ้างอิง และเตรียมข้อความ/รูปภาพ",
          en: "Discuss design styles, branding (CI), sitemap structure, competitor references, and collect initial copy/images."
        },
        clientRole: {
          th: "ส่งโลโก้แบรนด์ คอนเซปต์ และข้อความหรือเนื้อหาของแต่ละหน้าที่จะใช้",
          en: "Provide logos, branding guides, and raw text content for each page."
        },
        ourRole: {
          th: "วางโครงสร้างการนำทาง (Sitemap) และเสนอแนวทางการออกแบบจัดวางที่ดึงดูดสายตา",
          en: "Create the website navigation sitemap and propose high-impact layout styles."
        },
        deliverables: {
          th: "โครงสร้างเว็บไซต์ (Sitemap) และเอกสารสรุปทิศทางการออกแบบ (Design Brief)",
          en: "Approved Sitemap structure and Brand Design Brief."
        }
      },
      webapp: {
        title: { th: "วิเคราะห์ฟังก์ชัน & วาง Flow แอป", en: "Feature Specs & User Flow" },
        desc: {
          th: "กำหนดลักษณะการทำงานหลักของเว็บแอปพลิเคชัน (เช่น ระบบซื้อขาย, ระบบจอง) และสรุปขั้นตอนการเดินทางของผู้ใช้ (User Journey Map)",
          en: "Define core application functions (e.g., checkout, dashboard) and outline interactive user journeys."
        },
        clientRole: {
          th: "ระบุความต้องการฟีเจอร์เบื้องต้นและผู้ใช้งานหลักของระบบแอป",
          en: "Define baseline app features and target user personas."
        },
        ourRole: {
          th: "จัดทำแผนภาพเส้นทางการใช้งาน (User Journey) และเสนอสแต็กเทคโนโลยีที่เหมาะสม",
          en: "Create User Journey diagrams and recommend the optimal technology stack."
        },
        deliverables: {
          th: "แผนภาพกระบวนการทำงานของระบบ (Functional Diagram & User Flow)",
          en: "Functional Specification Diagram and User Flow document."
        }
      },
      system: {
        title: { th: "วางระบบข้อมูล & สิทธิ์ผู้ใช้", en: "Database ERD & User Roles" },
        desc: {
          th: "วิเคราะห์ตรรกะระบบหลังบ้านที่ซับซ้อน เช่น การจัดการสิทธิ์ผู้ใช้งาน (Roles & Permissions), วิธีจัดเก็บข้อมูล และโครงสร้างตารางข้อมูลหลัก",
          en: "Analyze backend complex logics like Role-Based Access Control (RBAC), database relationships, and core API integrations."
        },
        clientRole: {
          th: "อธิบายโครงสร้างการเข้าถึงข้อมูลของพนักงานในทีมและระดับความปลอดภัยที่ต้องการ",
          en: "Explain corporate permissions, organizational hierarchy, and security policies."
        },
        ourRole: {
          th: "ร่างตรรกะความสัมพันธ์ข้อมูล (ERD) และวิเคราะห์สถาปัตยกรรมระบบสำหรับองค์กร",
          en: "Draft Entity Relationship Database Diagrams (ERD) and System Architecture maps."
        },
        deliverables: {
          th: "แผนภาพสถาปัตยกรรมระบบ และโครงสร้างความสัมพันธ์ข้อมูล (ERD)",
          en: "System Architecture diagram and Entity Relationship Database model."
        }
      }
    }
  },
  {
    number: "02",
    icon: FileText,
    types: {
      website: {
        title: { th: "ประเมินราคา & แผนจัดทำหน้าเว็บ", en: "Page Breakdown & Costing" },
        desc: {
          th: "สรุปงบประมาณแบบคงที่ (Fixed-cost) ตามจำนวนหน้าที่พัฒนา ไม่มีค่าใช้จ่ายแอบแฝง พร้อมวางแผนการทำเสร็จสิ้นใน 1-2 สัปดาห์",
          en: "Provide a fixed-cost quote based on the page count with no hidden fees. Timeline target is 1-2 weeks."
        },
        clientRole: {
          th: "ตรวจสอบความเหมาะสมของงบประมาณและเซ็นสัญญาเริ่มงาน",
          en: "Review scope details, pricing milestones, and confirm the proposal."
        },
        ourRole: {
          th: "คำนวณราคาจัดทำเว็บแบบเหมาจ่ายตามสเปกและจัดทำใบเสนอราคา",
          en: "Calculate design and development hours to provide a fixed quotation."
        },
        deliverables: {
          th: "ใบเสนอราคารายละเอียดหน้าเว็บ (Quotation) และแผนส่งงาน",
          en: "Official Quotation (page-based) and Delivery Schedule."
        }
      },
      webapp: {
        title: { th: "วิเคราะห์ฟังก์ชัน & วางแผน Milestone", en: "Feature Breakdown & Costing" },
        desc: {
          th: "ประเมินงบประมาณแบ่งจ่ายตามผลงานฟีเจอร์ (Milestone-based) เช่น ระบบล็อกอิน, ระบบตะกร้าสินค้า เพื่อความคุ้มค่าและโปร่งใส",
          en: "Break down features into sprint milestones (e.g. auth, payments) and detail cost estimates for absolute transparency."
        },
        clientRole: {
          th: "ตรวจทาน Milestone และเงื่อนไขการทยอยชำระเงินตามผลงาน",
          en: "Review milestones and approve step-by-step payment terms based on outcomes."
        },
        ourRole: {
          th: "คำนวณชั่วโมงทำงานสำหรับฟังก์ชันที่ซับซ้อนและจัดทำโครงสร้างแผนราคา",
          en: "Calculate developer hours for complex features and build the pricing model."
        },
        deliverables: {
          th: "ใบเสนอราคาแยกตามฟังก์ชัน และแผนภาพ Gantt Chart",
          en: "Feature-based Quotation and Gantt Chart timeline."
        }
      },
      system: {
        title: { th: "ประเมินระบบแบบสัญญารายเดือน / Sprints", en: "System Scope & Sprint Pricing" },
        desc: {
          th: "ประเมินงบประมาณตามปริมาณงานในแต่ละ Sprint และค่าคลาวด์/เซิร์ฟเวอร์ที่ต้องใช้ เพื่อรองรับระบบขนาดใหญ่ที่มีความยืดหยุ่นสูง",
          en: "As custom backend systems evolve, we provide structured sprint planning, cloud infra cost projections, and SLA options."
        },
        clientRole: {
          th: "ประชุมพิจารณาขอบเขตเฟส 1 (MVP) และทำสัญญาบริการ",
          en: "Review Phase 1 MVP scope and approve system-level development agreement."
        },
        ourRole: {
          th: "ประเมินสเกลการใช้งานพร้อมคาดการณ์ค่าใช้จ่ายระบบคลาวด์",
          en: "Analyze system load scale and estimate hosting/cloud runtime costs."
        },
        deliverables: {
          th: "ข้อตกลงการพัฒนา (SLA/SOW Agreement) และเอกสารงบประมาณคลาวด์",
          en: "Detailed SOW (Statement of Work) and Cloud Infrastructure estimate sheet."
        }
      }
    }
  },
  {
    number: "03",
    icon: Palette,
    types: {
      website: {
        title: { th: "ออกแบบดีไซน์หน้าเว็บ (Visual UI)", en: "Visual Landing Page UI" },
        desc: {
          th: "เน้นการออกแบบความสวยงาม ตระการตา สไลด์สินค้า ภาพแบนเนอร์ และแอนิเมชันที่สอดคล้องกับภาพลักษณ์ระดับพรีเมียมของแบรนด์คุณ",
          en: "Focus on brand graphics, animations, transitions, and landing assets for maximum visual impact."
        },
        clientRole: {
          th: "รีวิวและแก้ไขโทนสี รูปแบบตัวหนังสือ และการจัดหน้าในแต่ละเพจ",
          en: "Review color theme, typography choices, and overall landing vibe."
        },
        ourRole: {
          th: "ส่งหน้าจอออกแบบความละเอียดสูงใน Figma (Desktop & Mobile) ให้ตรวจแก้งาน",
          en: "Deliver high-fidelity Figma designs optimized for desktop & mobile viewports."
        },
        deliverables: {
          th: "ลิงก์ตรวจงาน Figma UI Design ของหน้าเพจทั้งหมด",
          en: "Figma UI/UX Mockup for all primary pages."
        }
      },
      webapp: {
        title: { th: "ออกแบบ Flow หน้าจอและการคลิกใช้งาน", en: "Interactive App Prototype" },
        desc: {
          th: "ออกแบบหน้าจอกรอกข้อมูล หน้าซื้อขาย และสถานะต่างๆ ของเว็บแอป พร้อมทำ Interactive Prototype จำลองการคลิกให้คุณลองใช้ก่อนเริ่มโค้ด",
          en: "Focus on UI elements: input forms, responsive checkout layouts, user profiles, and clickable flow prototypes."
        },
        clientRole: {
          th: "ทดลองกดจำลองการใช้งานแอป เพื่อดูความยากง่ายของการใช้แอป",
          en: "Test mock interaction clicks to review app friendliness and ergonomics."
        },
        ourRole: {
          th: "ออกแบบ UI ส่วนกลาง (Design System) เพื่อความสม่ำเสมอของปุ่มและฟิลด์แอป",
          en: "Build a consistent Web Design System (buttons, input fields, state changes)."
        },
        deliverables: {
          th: "ลิงก์ Figma Clickable App Prototype (ทดลองคลิกปุ่มเชื่อมหน้าจอได้)",
          en: "Figma Clickable Prototype demonstrating major app pathways."
        }
      },
      system: {
        title: { th: "ออกแบบหน้าแดชบอร์ด & ตารางจัดการข้อมูล", en: "Dashboard Data Interface" },
        desc: {
          th: "ออกแบบตารางจัดเรียงข้อมูล กราฟสถิติตัวเลข แถบกรองข้อมูลขั้นสูง และหน้าจัดการสมาชิก เพื่อการควบคุมสิทธิ์อย่างมีประสิทธิภาพสูงสุด",
          en: "Design massive data grids, summary charts, complex filter patterns, and high-density dashboard layouts."
        },
        clientRole: {
          th: "ตรวจสอบคอลัมน์ข้อมูลและพารามิเตอร์การควบคุมในหน้าแดชบอร์ด",
          en: "Check if data columns and administrative actions meet operational needs."
        },
        ourRole: {
          th: "ออกแบบสไตล์ UI สำหรับข้อมูลแบบตารางและหน้ารายละเอียดข้อมูลที่ดูเรียบร้อย สบายตา",
          en: "Design high-density dashboard interface and customized database inputs."
        },
        deliverables: {
          th: "Figma Dashboard Design & UI Control Panel Mockup",
          en: "Figma Dashboard design system and control panel wireframes."
        }
      }
    }
  },
  {
    number: "04",
    icon: Code2,
    types: {
      website: {
        title: { th: "โค้ดดิ้งแบบเน้นความเร็วระดับวินาที", en: "Speed-Optimized Frontend Coding" },
        desc: {
          th: "เขียนโค้ด Next.js เน้นความเร็วการโหลดภาพและข้อความให้เสร็จในทันที (SSG) และแต่งสไตล์ด้วย Tailwind CSS v4 ที่มีประสิทธิภาพสูง",
          en: "Write Next.js code using Static Site Generation (SSG) and Tailwind CSS v4 for absolute speed and instant loading."
        },
        clientRole: {
          th: "ตรวจสอบความถูกต้องของตัวหนังสือ ลิงก์ และภาพบนหน้า Staging จริง",
          en: "Review live texts, copywriting, and image assets on staging domain."
        },
        ourRole: {
          th: "เขียนคอมโพเนนต์ให้ตอบสนองบนมือถือ แท็บเล็ต อย่างราบรื่น (Responsive Coding)",
          en: "Develop pixel-perfect responsive page layouts for mobile and tablets."
        },
        deliverables: {
          th: "ระบบหน้าบ้านที่เชื่อมขึ้นลิงก์ Staging (Vercel) สำหรับตรวจงาน",
          en: "Live website frontend deployed to a staging preview URL."
        }
      },
      webapp: {
        title: { th: "พัฒนาแอป & เชื่อมต่อ APIs ฐานข้อมูล", en: "Full-Stack Application Coding" },
        desc: {
          th: "เชื่อมต่อฐานข้อมูล Postgres/MySQL พัฒนา API หลังบ้านสำหรับการประมวลผลข้อมูล และเชื่อมกับระบบชำระเงินจริง เช่น Omise, Stripe, QR Code",
          en: "Build secure databases, write API endpoint handlers, construct auth, and integrate online checkout logic."
        },
        clientRole: {
          th: "ทดลองสร้างบัญชี ลองทำรายการและสั่งของจำลองผ่านเว็บ",
          en: "Register accounts, simulate payments, and test workflow sequences."
        },
        ourRole: {
          th: "เขียนตรรกะความปลอดภัยข้อมูล เข้ารหัสรหัสผ่าน และเชื่อมต่อ Payment API",
          en: "Implement API security filters, database encryption, and payment gateways."
        },
        deliverables: {
          th: "ระบบเว็บแอปใช้งานได้จริงบน Sandbox Staging URL",
          en: "Functional staging web application with working sandboxed database."
        }
      },
      system: {
        title: { th: "พัฒนาตรรกะระบบความปลอดภัย & หลังบ้าน", en: "Role-Based Access & API Engine" },
        desc: {
          th: "สร้างระบบที่มีการคุมสิทธิ์สูงด้วย Role-Based Access Control, เขียนฟังก์ชันส่งออก Excel รายงานประวัติย้อนหลัง และเขียนคำสั่งประมวลผลหลังบ้านแบบอัตโนมัติ",
          en: "Write custom API layers with Role-Based Access Control (RBAC), background jobs, export Excel reporting, and automated alerts."
        },
        clientRole: {
          th: "ทดสอบการล็อกอินบัญชีที่มีบทบาทต่างๆ เพื่อดูการแยกสิทธิ์การใช้งาน",
          en: "Verify permissions separation by switching accounts between Admin/User levels."
        },
        ourRole: {
          th: "ออกแบบตรรกะหลังบ้านป้องกันข้อมูลรั่วไหล และจัดเรียงฐานข้อมูลให้ทนทานต่อการขยายตัว",
          en: "Architect strict database authorization rules and build scalable backend engines."
        },
        deliverables: {
          th: "ระบบฐานข้อมูลหลังบ้านและ API Engine ที่ผ่านการรักษาความปลอดภัย",
          en: "Fully secure administrative system with encrypted access routes."
        }
      }
    }
  },
  {
    number: "05",
    icon: Gauge,
    types: {
      website: {
        title: { th: "จูนความเร็ว & ติดตั้งระบบ SEO", en: "Speed Tuning & SEO Prep" },
        desc: {
          th: "บีบอัดรูปภาพและสคริปต์หน้าเว็บ ทำการทดสอบคะแนน Lighthouse ให้ได้ 100/100 และเขียน Meta Tags ให้ตรงหลักเพื่อการจัดอันดับบน Google ที่ยอดเยี่ยม",
          en: "Optimize image compression, write structural SEO Meta tags, and push for a 100/100 Lighthouse score."
        },
        clientRole: {
          th: "เช็กความเร็วและการแสดงผลบนหน้าจอมือถือจริง",
          en: "Load the site on real mobile devices to verify immediate page load responsiveness."
        },
        ourRole: {
          th: "ตั้งค่าระบบ Caching และวิเคราะห์โครงสร้างข้อมูลเพื่อรองรับเครื่องมือค้นหา Google",
          en: "Minify CSS/JS assets, optimize font caching, and verify clean SEO crawling."
        },
        deliverables: {
          th: "รายงานความเร็วเว็บไซต์ (Lighthouse Report) และผลงานหน้าบ้านที่เสร็จสิ้น",
          en: "Lighthouse audit report detailing 100/100 SEO & performance metrics."
        }
      },
      webapp: {
        title: { th: "ทดสอบการทำงานของระบบแอป (QA)", en: "Logic QA & Sandbox Testing" },
        desc: {
          th: "ตรวจสอบความถูกต้องของฟังก์ชันซื้อขาย ตรวจหาบั๊กการทำงาน (QA) และตรวจสอบการตัดเงินและการอัปเดตสถานะให้เป็นไปตามเงื่อนไขอย่างถูกต้องแม่นยำ",
          en: "Perform validation checks on inputs, database transaction integrity, and execute sandbox payment flows."
        },
        clientRole: {
          th: "ทดสอบการใช้งานแอปพลิเคชันอย่างครบถ้วน (User Acceptance Testing - UAT)",
          en: "Perform User Acceptance Testing (UAT) to sign off on core workflows."
        },
        ourRole: {
          th: "แก้ไขบั๊กการคำนวณ ปรับปรุงการตอบสนองความเร็วของหน้าเว็บย่อย และตรวจสอบช่องโหว่ความปลอดภัย",
          en: "Debug application code, solve boundary cases, and optimize DB query performance."
        },
        deliverables: {
          th: "สรุปบันทึกการตรวจสอบความเสถียร (QA Log) และเอกสารพร้อมส่งมอบ",
          en: "QA test summary logs and verified transaction records."
        }
      },
      system: {
        title: { th: "ทดสอบความปลอดภัย & ความทนทานของระบบ", en: "Vulnerability Sweeps & Load Test" },
        desc: {
          th: "ทดสอบการประมวลผลข้อมูลปริมาณมากๆ พร้อมกัน (Load Testing) ตรวจเช็กระบบป้องกัน SQL Injection และเปิดใช้งานระบบสำรองฐานข้อมูลอัตโนมัติ",
          en: "Conduct system load testing under high request volume, run security vulnerability sweeps, and set auto-backup routines."
        },
        clientRole: {
          th: "ทดสอบความเร็วในการดึงข้อมูลจากตารางที่มีปริมาณข้อมูลจำนวนมาก",
          en: "Review reports with large sample sizes and confirm security compliance."
        },
        ourRole: {
          th: "ปิดช่องโหว่ความปลอดภัยทุกรูปแบบ ปรับจูนการอ่านเขียนฐานข้อมูลเพื่อให้ประหยัดค่าเซิร์ฟเวอร์",
          en: "Configure system firewalls, index complex DB queries, and secure database connections."
        },
        deliverables: {
          th: "รายงานความปลอดภัยของระบบ และแผนสำรองข้อมูลของระบบ (Database Backup System)",
          en: "System Security Audit summary and automated Backup Routine logs."
        }
      }
    }
  },
  {
    number: "06",
    icon: Rocket,
    types: {
      website: {
        title: { th: "เชื่อมโดเมน & เปิดใช้งานจริง", en: "Live Domain Setup & Handover" },
        desc: {
          th: "ชี้ DNS โดเมนของจริง เชื่อมต่อเซิร์ฟเวอร์ความเร็วสูง พร้อมเปิดใบรับรองความปลอดภัย SSL (HTTPS) และส่งมอบคู่มือแนะนำการอัปเกรดหน้าเว็บ",
          en: "Deploy production code to high-speed cloud edge servers, map your domain, and verify SSL security certificate."
        },
        clientRole: {
          th: "จัดเตรียมโดเมนเนมและสิทธิ์ในการเข้าจัดการโฮสติ้งหลัก",
          en: "Configure DNS records at your domain provider according to our guidelines."
        },
        ourRole: {
          th: "เชื่อมต่อระบบเข้าโดเมนหลักและดูแลรักษาเว็บเพิ่มเติมฟรี 30 วัน",
          en: "Verify SSL certificate configuration and submit sitemap to Google Search Console."
        },
        deliverables: {
          th: "เว็บไซต์บนโดเมนจริงของคุณ พร้อมเอกสารแนะนำการดูแลรักษาเบื้องต้น",
          en: "Live public website on your domain with active SSL encryption."
        }
      },
      webapp: {
        title: { th: "ขึ้นระบบแอปโปรดักชัน & สลับเป็นระบบชำระเงินจริง", en: "Production App Launch" },
        desc: {
          th: "โอนย้ายฐานข้อมูลจำลองสู่ฐานข้อมูลจริง เชื่อมระบบชำระเงินเข้าสู่ช่องทางการรับเงินจริงของธุรกิจ (Live Keys) และเปิดบริการแอปพลิเคชันอย่างเป็นทางการ",
          en: "Deploy client app and backend API to production, spin up active DB instances, and transition payment modules to live mode."
        },
        clientRole: {
          th: "เปิดใช้บัญชีตัวแทนรับชำระเงินจริง (Live Keys) และตรวจสอบผลลัพธ์การเงิน",
          en: "Provide live keys for external payment provider and authorize production database hosting billing."
        },
        ourRole: {
          th: "ติดตั้งระบบตรวจสอบข้อผิดพลาด (Sentry/Monitoring Logs) เพื่อวิเคราะห์ปัญหาหลังเปิดตัว",
          en: "Transition software to Live Production mode and monitor system logs for 30 days."
        },
        deliverables: {
          th: "แอปพลิเคชันบนโดเมนจริง คู่มือการใช้งานผู้ดูแล และการรับประกันระบบ 30 วัน",
          en: "Live operational web application, system admin documentation, and code handover."
        }
      },
      system: {
        title: { th: "ติดตั้งขึ้นคลาวด์องค์กร & จัดฝึกอบรม", en: "Cloud Scaling Launch & Staff Training" },
        desc: {
          th: "นำโค้ดและฐานข้อมูลติดตั้งบนเซิร์ฟเวอร์หลักขององค์กร เช่น VPS หรือ AWS พร้อมจัดส่งคู่มือการดูแลรักษาระบบและอบรมเจ้าหน้าที่ให้พร้อมคุมระบบ",
          en: "Deploy infrastructure to dedicated VPS or AWS cluster, configure Docker containers/auto-scaling, and train client staff."
        },
        clientRole: {
          th: "เข้าร่วมรับสิทธิ์เป็นผู้ดูแลระดับสูง (Owner Access) และเข้าอบรมการใช้งาน",
          en: "Attend training sessions and accept root administrator ownership transfers."
        },
        ourRole: {
          th: "โอนย้ายข้อมูลเดิมเข้าสู่เซิร์ฟเวอร์หลัก และเซ็นสัญญาซัพพอร์ตเซิร์ฟเวอร์ (SLA Contract)",
          en: "Configure automated server health alerts and provide dedicated technical SLA support."
        },
        deliverables: {
          th: "ระบบบริหารจัดการบนคลาวด์ส่วนตัวของบริษัท คู่มืออบรมพนักงาน และสัญญาซัพพอร์ตระบบ",
          en: "Live customized enterprise system, admin handbook, and SLA Support contract."
        }
      }
    }
  }
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [perspective, setPerspective] = useState<'business' | 'developer'>('business');
  const [projectType, setProjectType] = useState<'website' | 'webapp' | 'system'>('webapp');
  const [activeStep, setActiveStep] = useState(0);
  const isEn = i18n.language?.startsWith('en');

  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiHtml5 />, title: "Html" },
    { node: <SiCss />, title: "Css" },
    { node: <SiJavascript />, title: "Javascript" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-transparent px-4 py-28 sm:py-36 lg:px-8 border-b-2 border-primary-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dq=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-15 grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/90 to-transparent"></div>

        <div className="relative mx-auto max-w-7xl text-center z-10 flex flex-col items-center">

          {/* Glowing Switcher Widget */}
          <div className="mb-10 flex p-1.5 bg-primary-900/60 backdrop-blur-md border-2 border-primary-700 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] relative">
            <button
              onClick={() => setPerspective('business')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${perspective === 'business' ? 'text-primary-950 font-extrabold' : 'text-primary-100 hover:text-white'
                }`}
            >
              <Briefcase className="h-4 w-4" />
              {t('hero.toggle_business')}
            </button>
            <button
              onClick={() => setPerspective('developer')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${perspective === 'developer' ? 'text-primary-950 font-extrabold' : 'text-primary-100 hover:text-white'
                }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              {t('hero.toggle_developer')}
            </button>

            {/* Sliding Glowing Pill Overlay */}
            <motion.div
              layoutId="activePill"
              className="absolute top-1.5 bottom-1.5 bg-accent-500 rounded-full"
              initial={false}
              animate={{
                left: perspective === 'business' ? 6 : 'auto',
                right: perspective === 'developer' ? 6 : 'auto',
                width: perspective === 'business' ? 128 : 138
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-5xl text-5xl font-bold uppercase tracking-tighter text-white sm:text-7xl lg:text-8xl"
          >
            {t('hero.title_1')}<br />
            <span className="text-accent-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{t('hero.title_2')}</span>{t('hero.title_3')}
          </motion.h1>

          <div className="h-28 sm:h-24 flex items-center justify-center max-w-2xl mt-6 px-4">
            <AnimatePresence mode="wait">
              {perspective === 'business' ? (
                <motion.p
                  key="business-text"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="text-lg leading-relaxed text-primary-100 font-medium tracking-wide"
                >
                  {t('hero.subtitle_business')}
                </motion.p>
              ) : (
                <motion.p
                  key="developer-text"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="text-md leading-relaxed text-accent-500 font-mono font-bold tracking-tight bg-primary-900/40 p-4 border border-primary-800 rounded-lg max-w-xl"
                >
                  <span className="text-primary-500">&lt;div class=&quot;tech-specs&quot;&gt;</span><br />
                  {t('hero.subtitle_developer')}<br />
                  <span className="text-primary-500">&lt;/div&gt;</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Link href="/contact">
              <Magnet strength={30} range={80}>
                <Button size="xl" className="group">
                  <span className='text-base'>
                    {perspective === 'business' ? t('hero.cta_primary_business') : t('hero.cta_primary_developer')}
                  </span>
                  <ArrowRight className="h-6 w-6 ml-2 transition-transform group-hover:translate-x-2" />
                </Button>
              </Magnet>
            </Link>
            <Link href="/portfolio">
              <Magnet strength={20} range={75}>
                <Button variant="outline" size="xl" className='font-lg'>
                  {perspective === 'business' ? t('hero.cta_secondary_business') : t('hero.cta_secondary_developer')}
                </Button>
              </Magnet>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Infinite Loop Framework Showcase Marquee */}
      <section id="frameworks" className="bg-primary-950 py-6 border-b-2 border-primary-700 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600">
            {t('frameworks.tech_stack') || 'POWERED BY APEX TECHNOLOGY'}
          </span>
        </div>
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel="Technology partners"
        />

      </section>

      {/* Services Section */}
      <section id="services" className="bg-transparent py-24 sm:py-32 border-b-2 border-primary-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-500/10 via-primary-900 to-primary-900"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <ShinyText text={t('arsenal.title')} className="text-sm font-bold uppercase tracking-widest text-accent-500" />
            <p className="mt-2 text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              {t('arsenal.subtitle')}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            <ServiceCard
              title={t('arsenal.enterpriseTitle')}
              description={t('arsenal.enterpriseDesc')}
              Icon={Globe}
            />
            <ServiceCard
              title={t('arsenal.ecommerceTitle')}
              description={t('arsenal.ecommerceDesc')}
              Icon={ShoppingCart}
            />
            <ServiceCard
              title={t('arsenal.appsTitle')}
              description={t('arsenal.appsDesc')}
              Icon={Smartphone}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="portfolio" className="py-24 sm:py-32 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end mb-16">
            <div className="max-w-xl">
              <ShinyText text={isEn ? "Cooperation Flow" : "ขั้นตอนการร่วมงาน"} className="text-sm font-bold uppercase tracking-widest text-accent-500" />
              <p className="mt-2 text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
                {isEn ? "How We Build Your Project" : "กระบวนการรังสรรค์โปรเจกต์"}
              </p>
              <p className="mt-1 text-sm text-primary-400">
                {isEn ? "Select a project type to explore the custom engineering pipeline" : "เลือกประเภทงานด้านล่างเพื่อดูแผนผังการพัฒนาที่แตกต่างกันอย่างชัดเจน"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto lg:justify-end">
              {/* Project Type Switcher */}
              <div className="flex p-1.5 bg-primary-900/60 backdrop-blur-md border-2 border-primary-700 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] relative">
                <button
                  onClick={() => {
                    setProjectType('website');
                    setActiveStep(0);
                  }}
                  className={`px-4 py-2 rounded-full text-2xs font-extrabold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${projectType === 'website' ? 'text-primary-950 font-black bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'text-primary-100 hover:text-white'
                    }`}
                >
                  {isEn ? "Website" : "เว็บไซต์"}
                </button>
                <button
                  onClick={() => {
                    setProjectType('webapp');
                    setActiveStep(0);
                  }}
                  className={`px-4 py-2 rounded-full text-2xs font-extrabold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${projectType === 'webapp' ? 'text-primary-950 font-black bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'text-primary-100 hover:text-white'
                    }`}
                >
                  {isEn ? "Web App" : "เว็บแอป"}
                </button>
                <button
                  onClick={() => {
                    setProjectType('system');
                    setActiveStep(0);
                  }}
                  className={`px-4 py-2 rounded-full text-2xs font-extrabold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${projectType === 'system' ? 'text-primary-950 font-black bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'text-primary-100 hover:text-white'
                    }`}
                >
                  {isEn ? "System" : "ระบบเฉพาะทาง"}
                </button>
              </div>

              {/* View All Button */}
              <Link href="/portfolio" className="flex-shrink-0">
                <Magnet strength={15} range={60}>
                  <Button variant="outline">{isEn ? "View Portfolio" : "ดูผลงานทั้งหมด"}</Button>
                </Magnet>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Desktop Timeline Selector */}
            <div className="hidden lg:block lg:col-span-5 relative py-2">
              <div className="absolute left-[44px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-800 to-primary-900" />

              <motion.div
                className="absolute left-[44px] top-8 w-0.5 bg-white shadow-[0_0_8px_#ffffff]"
                animate={{ height: `${(activeStep / (stepsData.length - 1)) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ originY: 0 }}
              />

              <div className="space-y-4">
                {stepsData.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const StepIcon = step.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`flex items-center gap-6 relative z-10 w-full text-left group cursor-pointer py-3 pl-6 pr-4 transition-all duration-300 ${isActive ? "bg-primary-900/45" : "hover:bg-primary-900/10"
                        }`}
                    >
                      <div className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                        ? "border-white bg-white text-primary-950 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : "border-primary-700 bg-primary-950 text-primary-400 group-hover:border-primary-500 group-hover:text-white"
                        }`}>
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-2xs font-mono font-bold tracking-widest text-primary-500 block uppercase leading-none mb-1">
                          Step {step.number}
                        </span>
                        <h4 className={`text-lg font-bold tracking-wide transition-colors duration-200 ${isActive ? "text-white" : "text-primary-400 group-hover:text-primary-200"
                          }`}>
                          {isEn ? step.types[projectType].title.en : step.types[projectType].title.th}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile/Tablet Horizontal Selector */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 scrollbar-none">
              <div className="flex gap-4 min-w-max px-2">
                {stepsData.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const StepIcon = step.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`flex flex-col items-center justify-center p-4 border-2 transition-all duration-300 w-24 h-24 cursor-pointer ${isActive
                        ? "border-white bg-primary-900 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "border-primary-800 bg-primary-950/60 text-primary-400 hover:border-primary-700"
                        }`}
                    >
                      <StepIcon className="h-6 w-6 mb-2" />
                      <span className="text-2xs font-mono font-bold tracking-widest block uppercase leading-none">
                        {step.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details Card */}
            <div className="lg:col-span-7 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-primary-950 border-2 border-primary-700 shadow-[8px_8px_0_0_#ffffff] rounded-none p-8 relative overflow-hidden min-h-[460px] flex flex-col justify-between"
                >
                  <div className="absolute right-4 top-2 text-10xl font-bold font-mono text-white opacity-[0.02] select-none pointer-events-none leading-none">
                    {stepsData[activeStep].number}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 text-2xs font-mono font-bold tracking-widest text-primary-950 bg-white uppercase leading-none">
                        Phase {stepsData[activeStep].number}
                      </span>
                      <span className="text-primary-500 font-mono text-xs">/ {stepsData.length.toString().padStart(2, '0')}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                      {isEn ? stepsData[activeStep].types[projectType].title.en : stepsData[activeStep].types[projectType].title.th}
                    </h3>
                    <p className="text-primary-200 text-base leading-relaxed mb-8">
                      {isEn ? stepsData[activeStep].types[projectType].desc.en : stepsData[activeStep].types[projectType].desc.th}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-primary-850 pt-8">
                      {/* Client Role */}
                      <div className="bg-primary-900/40 p-4 border border-primary-850/50">
                        <div className="flex items-center gap-2 mb-3 text-accent-500 font-bold uppercase tracking-wider text-xs">
                          <User className="h-4 w-4" />
                          <span>{isEn ? "Your Role" : "บทบาทของคุณ"}</span>
                        </div>
                        <p className="text-sm text-primary-200">
                          {isEn ? stepsData[activeStep].types[projectType].clientRole.en : stepsData[activeStep].types[projectType].clientRole.th}
                        </p>
                      </div>

                      {/* Developer Role */}
                      <div className="bg-primary-900/40 p-4 border border-primary-850/50">
                        <div className="flex items-center gap-2 mb-3 text-accent-500 font-bold uppercase tracking-wider text-xs">
                          <Code2 className="h-4 w-4" />
                          <span>{isEn ? "Our Role" : "บทบาทของเรา"}</span>
                        </div>
                        <p className="text-sm text-primary-200">
                          {isEn ? stepsData[activeStep].types[projectType].ourRole.en : stepsData[activeStep].types[projectType].ourRole.th}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Deliverables */}
                  <div className="mt-8 bg-primary-900/80 p-4 border-l-4 border-white flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-2xs font-mono font-bold tracking-widest text-white uppercase whitespace-nowrap bg-primary-800 px-2 py-1 leading-none self-start sm:self-auto">
                      {isEn ? "Deliverable" : "ผลลัพธ์ที่จะได้รับ"}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {isEn ? stepsData[activeStep].types[projectType].deliverables.en : stepsData[activeStep].types[projectType].deliverables.th}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / CTA Section */}
      <section id="cta" className="bg-transparent py-24 sm:py-32 border-t-2 border-primary-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl">
                {t('ctaBlock.title_1')}<span className="text-accent-500">{t('ctaBlock.title_2')}</span>
              </h2>
              <p className="mt-6 text-xl leading-8 text-primary-100 font-medium">
                {t('ctaBlock.subtitle')}
              </p>
              <ul className="mt-10 space-y-6 text-primary-100 font-semibold uppercase tracking-wider">
                <li className="flex gap-x-4 items-center">
                  <Gem className="h-8 w-8 flex-none text-accent-500" />
                  <span>{t('ctaBlock.benefit1')}</span>
                </li>
                <li className="flex gap-x-4 items-center">
                  <Rocket className="h-8 w-8 flex-none text-accent-500" />
                  <span>{t('ctaBlock.benefit2')}</span>
                </li>
                <li className="flex gap-x-4 items-center">
                  <Gauge className="h-8 w-8 flex-none text-accent-500" />
                  <span>{t('ctaBlock.benefit3')}</span>
                </li>
              </ul>
              <div className="mt-12">
                <Link href="/contact">
                  <Magnet strength={30} range={80} className="w-full sm:w-auto">
                    <Button variant="primary" size="xl" className="w-full">{t('ctaBlock.contactBtn')}</Button>
                  </Magnet>
                </Link>
              </div>
            </div>

            <div 
              id="cta-watermark-target" 
              className="flex items-center justify-center min-h-[400px] w-full overflow-visible"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
