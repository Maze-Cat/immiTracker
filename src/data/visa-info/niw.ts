import type { BilingualVisaInfo } from '@/types/visa-info';

const niw: BilingualVisaInfo = {
  en: {
    slug: 'niw',
    title: 'EB-2 National Interest Waiver (NIW)',
    subtitle: 'Self-petition green card pathway for individuals whose work serves the US national interest',
    overview:
      'The EB-2 National Interest Waiver (NIW) is a green card pathway within the EB-2 preference category that allows qualified individuals to self-petition — no employer sponsorship or PERM labor certification required. Under the Dhanasar framework (Matter of Dhanasar, 2016), applicants must demonstrate three prongs: (1) the proposed endeavor has substantial merit and national importance, (2) the applicant is well positioned to advance the endeavor, and (3) on balance, it would benefit the United States to waive the job offer and labor certification requirements. NIW is popular among researchers, scientists, engineers, physicians, and entrepreneurs.',
    eligibility: [
      {
        requirement: 'EB-2 qualification: advanced degree or exceptional ability',
        details:
          'You must qualify under the EB-2 category — either hold a US master\'s degree or higher (or foreign equivalent), or have a bachelor\'s degree plus 5 years of progressive post-baccalaureate experience, or demonstrate exceptional ability in your field.',
      },
      {
        requirement: 'Prong 1: Substantial merit and national importance',
        details:
          'Your proposed endeavor must have both intrinsic merit (value to the field) and national-level importance. This does not require nationwide impact — contributions to a specific region or industry can qualify if they have broader implications.',
      },
      {
        requirement: 'Prong 2: Well positioned to advance the endeavor',
        details:
          'You must show that your education, skills, knowledge, and record of success make you well positioned to carry out the proposed endeavor. Evidence includes degrees, publications, citations, patents, grants, and professional recognition.',
      },
      {
        requirement: 'Prong 3: Beneficial to waive requirements',
        details:
          'On balance, it must benefit the US to waive the normal job offer and PERM labor certification requirements. Factors include the urgency of the work, the impracticality of the labor market test for your field, and the broader benefit to the US.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Prepare the NIW petition package',
        description:
          'Assemble evidence: personal statement describing your proposed endeavor, CV, publications and citation records, recommendation letters (5–8 from independent experts), degrees, awards, media coverage, and any evidence of national impact.',
        estimatedTime: '2–6 months of preparation',
      },
      {
        stepNumber: 2,
        title: 'File Form I-140 as a self-petitioner',
        description:
          'Submit Form I-140 (Immigrant Petition for Alien Workers) to USCIS with EB-2 NIW classification. No PERM required. Premium processing is available for a 15 business day response.',
        estimatedTime: '6–12 months standard; 15 business days premium',
      },
      {
        stepNumber: 3,
        title: 'Wait for priority date to become current',
        description:
          'Your priority date is set at I-140 filing. Monitor the monthly Visa Bulletin. For nationals of India and China, EB-2 backlogs can be significant.',
        estimatedTime: 'Varies by country — current for most, years for India/China',
      },
      {
        stepNumber: 4,
        title: 'File I-485 or consular processing',
        description:
          'When your priority date is current, file I-485 (Adjustment of Status) if in the US, or undergo consular processing if abroad. Concurrent filing with I-140 may be possible if dates are current. You will receive an EAD (work permit) and Advance Parole (travel document) while pending.',
        estimatedTime: '8–24 months',
      },
      {
        stepNumber: 5,
        title: 'Receive green card',
        description: 'Upon I-485 approval, USCIS mails your Permanent Resident Card. You can live and work anywhere in the US without employer restrictions.',
        estimatedTime: 'Upon approval',
      },
    ],
    timeline:
      'NIW preparation typically takes 2–6 months. I-140 processing is 6–12 months standard or 15 business days with premium processing. Total time to green card depends on priority date backlog — as fast as 1–2 years for non-backlogged countries, potentially 10+ years for India and China EB-2.',
    faqs: [
      {
        question: 'What is the Matter of Dhanasar framework?',
        answer: 'In 2016, the AAO replaced the older NYSDOT framework with Matter of Dhanasar, which established three prongs: (1) the proposed endeavor has substantial merit and national importance, (2) the petitioner is well-positioned to advance the endeavor, and (3) on balance, it is beneficial to waive the job offer and labor certification requirements.',
      },
      {
        question: 'Do I need an employer to file NIW?',
        answer:
          'No. NIW is a self-petition — you file on your own behalf. This is one of the key advantages over the standard EB-2 or EB-3 path, which requires employer sponsorship and PERM labor certification.',
      },
      {
        question: 'What fields qualify for NIW?',
        answer:
          'NIW is not limited to specific fields. Successful petitions have been filed in STEM, healthcare, business, education, arts, social sciences, and more. The key is demonstrating that your specific work has national importance.',
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
        question: 'How many recommendation letters do I need?',
        answer:
          'While there is no set number, 5–8 strong letters is typical. At least half should be from independent experts who are not your direct collaborators, supervisors, or co-authors.',
      },
      {
        question: 'What types of evidence strengthen an NIW case?',
        answer: 'Strong evidence includes: high-impact publications with significant citations, patents (especially licensed or commercialized), prestigious awards, expert recommendation letters (ideally from independent experts), media coverage of your work, and a clear plan showing how your work benefits the US nationally.',
      },
      {
        question: 'Can I file NIW and PERM at the same time?',
        answer:
          'Yes. A dual-track strategy is common — filing NIW (self-petition) alongside a PERM-based EB-2 or EB-3 through your employer. This hedges against processing delays or denial on either track. The earlier priority date from either case can be used.',
      },
      {
        question: 'What is the approval rate for NIW?',
        answer:
          'USCIS does not publish official approval rates for NIW specifically. Approval depends heavily on the strength of your evidence and how well your petition addresses the three Dhanasar prongs. A well-prepared petition with strong evidence has a high likelihood of approval.',
      },
      {
        question: 'Can I change jobs after NIW I-140 is approved?',
        answer:
          'Yes. Since NIW is a self-petition, you are not tied to a specific employer. However, your new work should be in the same or similar field as your proposed endeavor. After I-485 has been pending 180+ days, AC21 portability provides additional flexibility.',
      },
      {
        question: 'Is NIW suitable for entrepreneurs?',
        answer: 'Yes. Since NIW doesn\'t require employer sponsorship, entrepreneurs can self-petition based on their business endeavors. You must demonstrate that your entrepreneurial work has substantial merit and national importance.',
      },
    ],
  },

  zh: {
    slug: 'niw',
    title: 'EB-2国家利益豁免（NIW）',
    subtitle: '适用于工作对美国国家利益有贡献的个人的自行申请绿卡途径',
    overview:
      'EB-2国家利益豁免（NIW）是EB-2优先类别下的一种绿卡途径，允许符合条件的申请人自行申请——无需雇主担保或PERM劳工认证。依据Dhanasar框架（Matter of Dhanasar, 2016），申请人须证明三个要素：（1）拟从事的事业具有实质性价值和国家级重要性；（2）申请人有充分条件推进该事业；（3）综合衡量，豁免工作邀请和劳工认证要求对美国有利。NIW在研究人员、科学家、工程师、医生及创业者群体中尤为流行。',
    eligibility: [
      {
        requirement: 'EB-2资格：高等学历或特殊才能',
        details:
          '您须符合EB-2类别要求——持有美国硕士或更高学位（或同等外国学历），或持有学士学位加5年以上递进式工作经验，或在您的领域展现特殊才能。',
      },
      {
        requirement: '要素一：具有实质性价值和国家级重要性',
        details:
          '您拟从事的事业须同时具备内在价值（对该领域的贡献）和国家级重要性。这不要求全国范围的影响——对特定地区或行业的贡献，只要具有更广泛的意义即可。',
      },
      {
        requirement: '要素二：有充分条件推进该事业',
        details:
          '您须证明您的教育背景、技能、知识和成功记录使您有充分条件开展拟议事业。证据包括学位、发表论文、引用量、专利、科研资助及专业认可等。',
      },
      {
        requirement: '要素三：豁免要求对美国有利',
        details:
          '综合衡量，豁免正常的工作邀请和PERM劳工认证要求须对美国有利。考虑因素包括工作的紧迫性、劳动力市场测试对该领域的不实际性，以及对美国的更广泛利益。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '准备NIW申请材料',
        description:
          '整理证据材料：描述拟议事业的个人陈述、简历、发表论文及引用记录、推荐信（5至8封来自独立专家）、学位证书、奖项、媒体报道，以及国家级影响力的相关证据。',
        estimatedTime: '准备期约2至6个月',
      },
      {
        stepNumber: 2,
        title: '以自行申请人身份提交I-140表格',
        description:
          '向USCIS提交I-140表格（外籍工人移民请愿书），选择EB-2 NIW类别。无需PERM。可选加急处理，15个工作日内获得回复。',
        estimatedTime: '标准处理6至12个月；加急处理15个工作日',
      },
      {
        stepNumber: 3,
        title: '等待优先日期排到',
        description:
          '您的优先日期以I-140提交日期为准。请每月关注签证公告。对于印度和中国申请人，EB-2排期积压可能较为严重。',
        estimatedTime: '因国籍而异——大多数国家即时可用，印度/中国可能需等待数年',
      },
      {
        stepNumber: 4,
        title: '提交I-485或进行领事处理',
        description:
          '当优先日期排到时，如在美国境内可提交I-485（身份调整）；如在境外则进行领事处理。如果排期已排到，可能可以与I-140同时提交。提交后可获得EAD工卡（工作许可）和回美证（旅行许可）。',
        estimatedTime: '8至24个月',
      },
      {
        stepNumber: 5,
        title: '获得绿卡',
        description: 'I-485获批后，USCIS邮寄永久居民卡。您可在美国任何地方自由生活和工作，不受雇主限制。',
        estimatedTime: '获批后即发放',
      },
    ],
    timeline:
      'NIW准备通常需要2至6个月。I-140标准处理需6至12个月，加急处理仅需15个工作日。获得绿卡的总时间取决于排期积压情况——非积压国家最快1至2年，印度和中国的EB-2可能需要10年以上。',
    faqs: [
      {
        question: '什么是Dhanasar案框架？',
        answer: '2016年，行政上诉办公室（AAO）用Dhanasar案取代了旧的NYSDOT框架，确立了三个审查要素：(1) 拟议事业具有实质性价值和国家重要性；(2) 申请人有能力推进该事业；(3) 综合考量后，豁免工作邀请和劳工认证要求符合国家利益。',
      },
      {
        question: '申请NIW需要雇主吗？',
        answer:
          '不需要。NIW是自行申请——您代表自己提交申请。这是NIW相比标准EB-2或EB-3途径的关键优势之一，后者需要雇主担保和PERM劳工认证。',
      },
      {
        question: '哪些领域可以申请NIW？',
        answer:
          'NIW不限于特定领域。成功的申请涵盖STEM、医疗、商业、教育、艺术、社会科学等多个领域。关键在于证明您的具体工作具有国家级重要性。',
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
        question: '需要多少封推荐信？',
        answer:
          '虽然没有硬性规定，但通常需要5至8封有力的推荐信。至少一半应来自独立专家，即非您的直接合作者、导师或共同作者。',
      },
      {
        question: '哪些证据材料有助于增强NIW申请？',
        answer: '有力证据包括：高影响力论文及大量引用、专利（尤其是已许可或商业化的）、知名奖项、独立专家推荐信、工作的媒体报道，以及清晰展示您的工作如何在国家层面惠及美国的计划。',
      },
      {
        question: '可以同时提交NIW和PERM吗？',
        answer:
          '可以。双轨策略很常见——同时提交NIW（自行申请）和通过雇主的PERM-based EB-2或EB-3申请，以对冲任何一条途径的审理延迟或拒签风险。两个案件中较早的优先日期可被使用。',
      },
      {
        question: 'NIW的批准率是多少？',
        answer:
          'USCIS并未公布NIW的具体批准率。批准与否很大程度上取决于证据的说服力以及申请书对Dhanasar三要素的回应质量。材料充分、证据有力的申请通常有较高的批准可能性。',
      },
      {
        question: 'NIW的I-140获批后可以换工作吗？',
        answer:
          '可以。由于NIW是自行申请，您不受限于特定雇主。但新工作应与您的拟议事业属于同一或相似领域。I-485提交满180天后，AC21可携带条款提供额外灵活性。',
      },
      {
        question: 'NIW适合创业者吗？',
        answer: '适合。由于NIW不需要雇主担保，创业者可以基于自己的商业计划自行申请。须证明创业活动具有实质性价值和国家重要性。',
      },
    ],
  },
};

export default niw;
