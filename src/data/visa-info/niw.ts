import type { BilingualVisaInfo } from '@/types/visa-info';

const niw: BilingualVisaInfo = {
  en: {
    slug: 'niw',
    title: 'EB-2 National Interest Waiver (NIW)',
    subtitle: 'Self-petition green card pathway for professionals whose work benefits the US national interest',
    overview:
      'The National Interest Waiver (NIW) is a special provision under the EB-2 immigration category that allows individuals to self-petition for a green card without employer sponsorship or PERM labor certification. To qualify, you must demonstrate that your work has substantial merit and national importance, that you are well-positioned to advance the proposed endeavor, and that it would be beneficial to the US to waive the job offer and labor certification requirements. NIW is particularly popular among researchers, scientists, engineers, physicians, and entrepreneurs.',
    eligibility: [
      {
        requirement: 'Advanced degree or exceptional ability',
        details: 'You must qualify for EB-2: hold a US master\'s degree or higher (or foreign equivalent), OR a bachelor\'s degree plus 5+ years of progressive experience, OR demonstrate exceptional ability in your field.',
      },
      {
        requirement: 'Proposed endeavor has substantial merit and national importance',
        details: 'Under the Matter of Dhanasar framework (2016), your proposed work must have both substantial merit (significant value in the field) and national importance (impact beyond a local area or single employer).',
      },
      {
        requirement: 'You are well-positioned to advance the endeavor',
        details: 'You must show education, skills, knowledge, track record of success, a plan to continue the endeavor, and progress you have already made.',
      },
      {
        requirement: 'Beneficial to waive the job offer requirement',
        details: 'On balance, it must be beneficial to the US to waive the normal PERM labor certification and job offer requirement. Factors include urgency, unique qualifications, and broad impact.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Prepare the NIW petition package',
        description: 'Compile evidence: publications, citations, patents, awards, expert recommendation letters, a detailed plan for your proposed endeavor, and evidence of national importance. Many applicants work with an immigration attorney to build a strong case.',
        estimatedTime: '1–3 months preparation',
      },
      {
        stepNumber: 2,
        title: 'File Form I-140 with NIW classification',
        description: 'Self-file Form I-140 (Immigrant Petition for Alien Workers) with USCIS, requesting EB-2 classification with a National Interest Waiver. No employer sponsor or PERM is needed. Premium processing (15 business days) is available.',
        estimatedTime: '6–12 months standard; 15 business days premium',
      },
      {
        stepNumber: 3,
        title: 'Wait for priority date to become current',
        description: 'Your priority date is the I-140 filing date. Monitor the monthly Visa Bulletin. For most countries NIW priority dates are relatively current; China and India EB-2 may have multi-year backlogs.',
        estimatedTime: 'Varies: current for most countries; 2–5+ years for China/India',
      },
      {
        stepNumber: 4,
        title: 'File I-485 Adjustment of Status (or consular processing)',
        description: 'When your priority date is current, file I-485 if in the US (or go through consular processing if abroad). You will receive an EAD (work permit) and Advance Parole (travel document) while pending.',
        estimatedTime: '8–24 months',
      },
      {
        stepNumber: 5,
        title: 'Receive green card',
        description: 'Upon I-485 approval, USCIS mails your Permanent Resident Card. You can live and work anywhere in the US without employer restrictions.',
        estimatedTime: 'Upon approval',
      },
    ],
    timeline: 'NIW processing from petition to green card: 1–2 years for non-backlogged countries, 3–7+ years for China and India due to EB-2 per-country caps. Premium processing for the I-140 stage is available and strongly recommended.',
    faqs: [
      {
        question: 'What is the Matter of Dhanasar framework?',
        answer: 'In 2016, the AAO replaced the older NYSDOT framework with Matter of Dhanasar, which established three prongs: (1) the proposed endeavor has substantial merit and national importance, (2) the petitioner is well-positioned to advance the endeavor, and (3) on balance, it is beneficial to waive the job offer and labor certification requirements.',
      },
      {
        question: 'Do I need an employer sponsor for NIW?',
        answer: 'No. NIW is a self-petition category. You file the I-140 yourself without needing an employer to sponsor you. This is one of the biggest advantages of NIW over PERM-based EB-2.',
      },
      {
        question: 'Can I work for any employer while my NIW is pending?',
        answer: 'While the I-140 is pending, your work authorization depends on your current visa status. After filing I-485, you can obtain an EAD card that allows you to work for any employer.',
      },
      {
        question: 'How is NIW different from EB-1A?',
        answer: 'EB-1A requires "extraordinary ability" — a very high bar (top of the field). NIW requires "exceptional ability" or an advanced degree, plus national interest — a lower bar. EB-1A has no per-country backlog issues, while NIW (EB-2) has backlogs for China and India.',
      },
      {
        question: 'What types of evidence strengthen an NIW case?',
        answer: 'Strong evidence includes: high-impact publications with significant citations, patents (especially licensed or commercialized), prestigious awards, expert recommendation letters (ideally from independent experts), media coverage of your work, and a clear plan showing how your work benefits the US nationally.',
      },
      {
        question: 'Can I file NIW and PERM at the same time?',
        answer: 'Yes. Many applicants file NIW (self-petition) and PERM-based EB-2 or EB-3 (employer-sponsored) concurrently as a dual-track strategy. If one is denied or delayed, the other may still succeed. The earlier priority date from either case can be used.',
      },
      {
        question: 'Is NIW suitable for entrepreneurs?',
        answer: 'Yes. Since NIW doesn\'t require employer sponsorship, entrepreneurs can self-petition based on their business endeavors. You must demonstrate that your entrepreneurial work has substantial merit and national importance.',
      },
    ],
  },

  zh: {
    slug: 'niw',
    title: 'EB-2 国家利益豁免（NIW）',
    subtitle: '适用于工作对美国具有国家利益的专业人士的自行申请绿卡途径',
    overview:
      '国家利益豁免（NIW）是EB-2移民类别下的特殊条款，允许个人在无需雇主担保或PERM劳工认证的情况下自行申请绿卡。申请人须证明其工作具有实质性价值和国家重要性，有能力推进拟议事业，且豁免工作邀请和劳工认证要求符合美国国家利益。NIW在研究人员、科学家、工程师、医生和创业者中尤为受欢迎。',
    eligibility: [
      {
        requirement: '高学历或特殊能力',
        details: '须符合EB-2资格：持有美国硕士学位或更高学历（或外国同等学历），或学士学位加5年以上递进式工作经验，或在所在领域具有特殊能力。',
      },
      {
        requirement: '拟议事业具有实质性价值和国家重要性',
        details: '根据Dhanasar案框架（2016年），您的拟议工作须同时具备实质性价值（在该领域的重要意义）和国家重要性（影响超出单个地区或单个雇主）。',
      },
      {
        requirement: '您有能力推进该事业',
        details: '须证明您的教育背景、专业技能、知识储备、成功记录、继续推进的计划以及已取得的进展。',
      },
      {
        requirement: '豁免工作邀请要求符合国家利益',
        details: '综合考量后，豁免PERM劳工认证和工作邀请要求须对美国有利。考量因素包括紧迫性、独特资质和广泛影响力。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '准备NIW申请材料',
        description: '整理证据材料：论文发表、引用次数、专利、奖项、专家推荐信、拟议事业的详细计划及国家重要性证明。建议与移民律师合作以构建有力的申请。',
        estimatedTime: '准备阶段1–3个月',
      },
      {
        stepNumber: 2,
        title: '提交I-140移民请愿书（NIW类别）',
        description: '自行向USCIS提交I-140表格，申请EB-2类别并请求国家利益豁免。无需雇主担保或PERM。可选加急处理（15个工作日）。',
        estimatedTime: '标准处理6–12个月；加急处理15个工作日',
      },
      {
        stepNumber: 3,
        title: '等待优先日期排到',
        description: '优先日期为I-140提交日。每月查阅签证公告。大多数国家的NIW优先日期相对较快；中国和印度EB-2可能需要等待数年。',
        estimatedTime: '大多数国家无需等待；中国/印度约2–5年以上',
      },
      {
        stepNumber: 4,
        title: '提交I-485身份调整（或领事处理）',
        description: '当优先日期排到时，如在美国境内可提交I-485。提交后可获得EAD工卡（工作许可）和回美证（旅行许可）。如在境外则进行领事处理。',
        estimatedTime: '8–24个月',
      },
      {
        stepNumber: 5,
        title: '获得绿卡',
        description: 'I-485获批后，USCIS邮寄永久居民卡。您可在美国任何地方自由生活和工作，不受雇主限制。',
        estimatedTime: '获批后即发放',
      },
    ],
    timeline: 'NIW从提交到获得绿卡：非积压国家约1–2年，中国和印度因EB-2每国名额限制约需3–7年以上。I-140阶段可选加急处理，强烈建议使用。',
    faqs: [
      {
        question: '什么是Dhanasar案框架？',
        answer: '2016年，行政上诉办公室（AAO）用Dhanasar案取代了旧的NYSDOT框架，确立了三个审查要素：(1) 拟议事业具有实质性价值和国家重要性；(2) 申请人有能力推进该事业；(3) 综合考量后，豁免工作邀请和劳工认证要求符合国家利益。',
      },
      {
        question: 'NIW需要雇主担保吗？',
        answer: '不需要。NIW是自行申请类别，您可以自己提交I-140，无需雇主担保。这是NIW相较于基于PERM的EB-2的最大优势之一。',
      },
      {
        question: 'NIW申请期间可以为任何雇主工作吗？',
        answer: 'I-140审理期间，您的工作授权取决于当前签证身份。提交I-485后，可获得EAD工卡，允许为任何雇主工作。',
      },
      {
        question: 'NIW和EB-1A有什么区别？',
        answer: 'EB-1A要求"杰出才能"——标准非常高（领域内顶尖水平）。NIW要求"特殊才能"或高学历，加上国家利益——标准相对较低。EB-1A通常无排期问题，而NIW（EB-2）中国和印度有排期积压。',
      },
      {
        question: '哪些证据材料有助于增强NIW申请？',
        answer: '有力证据包括：高影响力论文及大量引用、专利（尤其是已许可或商业化的）、知名奖项、独立专家推荐信、工作的媒体报道，以及清晰展示您的工作如何在国家层面惠及美国的计划。',
      },
      {
        question: '可以同时申请NIW和PERM吗？',
        answer: '可以。许多申请人采用双轨策略，同时提交NIW（自行申请）和基于PERM的EB-2或EB-3（雇主担保）。如果一条路径被拒或延迟，另一条仍可能成功。两个案件中较早的优先日期可被使用。',
      },
      {
        question: 'NIW适合创业者吗？',
        answer: '适合。由于NIW不需要雇主担保，创业者可以基于自己的商业计划自行申请。须证明创业活动具有实质性价值和国家重要性。',
      },
    ],
  },
};

export default niw;
