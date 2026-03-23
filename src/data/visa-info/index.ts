import type { BilingualVisaInfo, VisaInfoContent } from '@/types/visa-info';
import opt from './opt';
import stemOpt from './stem-opt';
import h1b from './h1b';
import h4 from './h4';
import perm from './perm';

const greenCardEn: VisaInfoContent = {
  slug: 'green-card',
  title: 'Employment-Based Green Card',
  subtitle:
    'Permanent residency through employer sponsorship — EB-1, EB-2, EB-3, EB-4, and EB-5 categories',
  overview:
    'An employment-based (EB) green card grants permanent resident status to foreign nationals sponsored by a US employer (or in some categories, self-petitioned). The main preference categories are EB-1 (extraordinary ability / multinational managers), EB-2 (advanced degree or exceptional ability), and EB-3 (skilled workers and professionals). Processing involves a multi-step path: PERM labor certification → I-140 immigrant petition → Adjustment of Status or Consular Processing, subject to annual per-country visa quotas.',
  eligibility: [
    {
      requirement: 'Valid employment-based immigrant petition (I-140)',
      details:
        'A USCIS-approved I-140 is the core eligibility document for most EB categories. EB-1A and EB-2 NIW allow self-petition.',
    },
    {
      requirement: 'Priority date is current in the Visa Bulletin',
      details:
        'Your priority date (typically the date your PERM or I-140 was filed) must be earlier than the cutoff date published by the State Department each month.',
    },
    {
      requirement: 'Admissibility to the United States',
      details:
        'You must be admissible to the US or eligible for a waiver of inadmissibility grounds.',
    },
    {
      requirement: 'Continuous lawful status (for Adjustment of Status)',
      details:
        'If adjusting status inside the US, you must have maintained lawful status since your last entry.',
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'PERM Labor Certification (EB-2 / EB-3)',
      description:
        'Employer conducts recruitment and files ETA-9089 with the Department of Labor to obtain a certified PERM. This establishes the priority date.',
      estimatedTime: '6–18 months',
    },
    {
      stepNumber: 2,
      title: 'File Form I-140 Immigrant Petition',
      description:
        'Employer (or self-petitioner for EB-1A / EB-2 NIW) files Form I-140 with USCIS. Premium processing (15 business days) is available.',
      estimatedTime: '6–12 months standard; 15 business days premium',
    },
    {
      stepNumber: 3,
      title: 'Wait for priority date to become current',
      description:
        'Monitor the monthly USCIS Visa Bulletin. When your priority date is earlier than the cutoff, you may proceed.',
      estimatedTime: 'Varies widely — months to decades by country/category',
    },
    {
      stepNumber: 4,
      title: 'File Form I-485 (Adjustment of Status) or Consular Processing',
      description:
        'If inside the US, file I-485 with supporting documents. If abroad, go through NVC and a US consulate interview.',
      estimatedTime: '8–24 months',
    },
    {
      stepNumber: 5,
      title: 'Receive Green Card',
      description:
        'After approval, USCIS mails the physical Permanent Resident Card, valid for 10 years (renewable).',
      estimatedTime: '2–4 weeks after approval',
    },
  ],
  timeline:
    'The full EB green card process can take 1–30+ years depending on your category, country of birth, and priority date backlog. EB-1 and EB-2 NIW can move faster for non-backlogged countries. Use the Priority Date Tracker to monitor monthly progress.',
  faqs: [
    {
      question: 'What is a priority date?',
      answer:
        'Your priority date is generally the date your PERM application was filed with DOL, or the I-140 filing date if no PERM is required. It determines your place in the queue.',
    },
    {
      question: 'What is the difference between Final Action Dates and Dates for Filing?',
      answer:
        'Final Action Dates determine when a green card can actually be issued. Dates for Filing (when permitted by USCIS) allow you to submit the I-485 earlier, before a visa number is immediately available.',
    },
    {
      question: 'Can I change employers while my green card is pending?',
      answer:
        'Under AC21 portability, if your I-485 has been pending for 180+ days and your I-140 is approved, you may change to a same or similar occupation without jeopardising your case.',
    },
    {
      question: 'What happens if my I-140 is withdrawn by my employer?',
      answer:
        'If withdrawn before the I-485 has been pending 180 days, it may affect your case. After 180 days of I-485 pending with an approved I-140, you retain portability rights even if the I-140 is later withdrawn.',
    },
  ],
};

const greenCardZh: VisaInfoContent = {
  slug: 'green-card',
  title: '职业移民绿卡',
  subtitle: '通过雇主担保获得永久居留权——EB-1、EB-2、EB-3、EB-4及EB-5类别',
  overview:
    '职业移民（EB）绿卡授予由美国雇主担保（或在某些类别中由本人自行申请）的外国公民永久居留资格。主要优先级类别包括：EB-1（杰出人才/跨国公司高管）、EB-2（高学历或特殊能力）和EB-3（技术工人及专业人士）。申请流程包括：PERM劳工认证 → I-140移民请愿书 → 身份调整或领事处理，并受每年各国名额限制的约束。',
  eligibility: [
    {
      requirement: '持有有效的职业移民请愿书（I-140）',
      details:
        'USCIS批准的I-140是大多数EB类别的核心资格文件。EB-1A和EB-2 NIW可自行申请。',
    },
    {
      requirement: '优先日期已在签证公告中排期',
      details:
        '您的优先日期（通常为PERM或I-140的申请日期）必须早于美国国务院每月发布的截止日期。',
    },
    {
      requirement: '具备进入美国的资格',
      details: '您必须符合进入美国的条件，或有资格获得豁免。',
    },
    {
      requirement: '持续合法身份（身份调整申请者）',
      details: '在美国境内申请身份调整时，自上次入境以来必须一直保持合法身份。',
    },
  ],
  processSteps: [
    {
      stepNumber: 1,
      title: 'PERM劳工认证（EB-2/EB-3）',
      description:
        '雇主完成招聘程序并向劳工部提交ETA-9089表格，以获得PERM认证。此步骤确立优先日期。',
      estimatedTime: '6至18个月',
    },
    {
      stepNumber: 2,
      title: '提交I-140移民请愿书',
      description:
        '雇主（或EB-1A/EB-2 NIW的自行申请者）向USCIS提交I-140表格。可选择加急处理（15个工作日）。',
      estimatedTime: '标准处理6–12个月；加急处理15个工作日',
    },
    {
      stepNumber: 3,
      title: '等待优先日期排期',
      description:
        '每月关注USCIS签证公告。当您的优先日期早于截止日期时，即可进行下一步。',
      estimatedTime: '因国家/类别而异，可能需要数月至数十年',
    },
    {
      stepNumber: 4,
      title: '提交I-485（身份调整）或领事处理',
      description:
        '在美国境内可提交I-485及相关材料；在境外则通过NVC和美国领事馆进行面签。',
      estimatedTime: '8至24个月',
    },
    {
      stepNumber: 5,
      title: '获得绿卡',
      description: '批准后，USCIS将邮寄实体永久居民卡，有效期10年（可续期）。',
      estimatedTime: '批准后2至4周',
    },
  ],
  timeline:
    '完整的EB绿卡流程可能需要1年至30年以上，具体取决于您的类别、出生国以及排期积压情况。非积压国家的EB-1和EB-2 NIW申请通常处理较快。请使用排期追踪器每月关注最新进展。',
  faqs: [
    {
      question: '什么是优先日期？',
      answer:
        '优先日期通常是您向劳工部提交PERM申请的日期，或在无需PERM的情况下为I-140的申请日期。它决定您在排队中的位置。',
    },
    {
      question: '最终行动日期和递交申请日期有何区别？',
      answer:
        '最终行动日期决定绿卡何时可以实际签发。递交申请日期（在USCIS允许时）允许您在签证号码尚未立即可用之前提前提交I-485。',
    },
    {
      question: '绿卡申请期间可以换工作吗？',
      answer:
        '根据AC21可携带规则，如果您的I-485已申请超过180天且I-140已获批，您可以更换至同一或类似职业，而不影响您的申请。',
    },
    {
      question: '如果雇主撤回I-140怎么办？',
      answer:
        '如果在I-485申请不足180天时被撤回，可能会影响您的案件。但若I-485已申请满180天且I-140已获批，即使之后被撤回，您仍保留可携带权利。',
    },
  ],
};

const greenCard: BilingualVisaInfo = { en: greenCardEn, zh: greenCardZh };

const visaDataMap: Record<string, BilingualVisaInfo> = {
  opt,
  'stem-opt': stemOpt,
  h1b,
  h4,
  perm,
  'green-card': greenCard,
};

export default visaDataMap;
