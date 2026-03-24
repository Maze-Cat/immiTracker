import type { BilingualVisaInfo } from '@/types/visa-info';

const b1b2: BilingualVisaInfo = {
  en: {
    slug: 'b1b2',
    title: 'B-1/B-2 Visitor Visa',
    subtitle: 'Temporary visa for business visitors (B-1) and tourists or pleasure travelers (B-2)',
    overview:
      'The B-1/B-2 visa is the most common US nonimmigrant visa, allowing foreign nationals to enter the United States temporarily for business (B-1) or tourism, vacation, medical treatment, or visiting family and friends (B-2). Most applicants are issued a combined B-1/B-2 visa. The visa itself is a travel document; the actual period of authorized stay is determined by US Customs and Border Protection (CBP) at the port of entry, typically up to 6 months. B-1/B-2 visas do not permit employment in the United States.',
    eligibility: [
      {
        requirement: 'Legitimate temporary purpose',
        details:
          'B-1 covers business activities such as attending conferences, negotiating contracts, consulting with business associates, or participating in professional conventions. B-2 covers tourism, vacation, visiting family or friends, medical treatment, and amateur cultural or athletic events.',
      },
      {
        requirement: 'Nonimmigrant intent',
        details:
          'You must demonstrate strong ties to your home country — such as employment, property, family, or financial ties — that will compel you to return after your temporary visit. Applicants who appear to be immigrating will be denied.',
      },
      {
        requirement: 'Sufficient funds for the trip',
        details:
          'You must show that you have sufficient funds to cover all expenses during your stay in the US, or that a sponsor in the US will provide financial support.',
      },
      {
        requirement: 'Valid passport and no visa ineligibility',
        details:
          'Your passport must be valid for at least 6 months beyond your intended stay. You must not have been previously deported, have certain criminal convictions, or otherwise be inadmissible under US immigration law.',
      },
      {
        requirement: 'No unauthorized employment intended',
        details:
          'B-1/B-2 visa holders may not work for a US employer or receive a US salary. B-1 business activities must be incidental to international business and compensated from abroad.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Complete Form DS-160 (Online Nonimmigrant Visa Application)',
        description:
          'Fill out and submit Form DS-160 on the Consular Electronic Application Center (CEAC) website. Upload a qualifying photo. Save the confirmation page barcode — you will need it for your appointment.',
        estimatedTime: '1–2 hours to complete',
      },
      {
        stepNumber: 2,
        title: 'Pay the visa application fee and schedule an interview',
        description:
          'Pay the MRV (Machine Readable Visa) fee, typically $185 for B-1/B-2. Schedule a visa interview appointment at the nearest US Embassy or Consulate. Wait times vary widely by post.',
        estimatedTime: 'Days to months depending on consulate wait times',
      },
      {
        stepNumber: 3,
        title: 'Attend the consular interview',
        description:
          'Bring your DS-160 confirmation, passport, fee receipt, photo, and supporting documents (itinerary, bank statements, employment letter, ties to home country). The consular officer will determine eligibility.',
        estimatedTime: 'Interview typically 2–10 minutes',
      },
      {
        stepNumber: 4,
        title: 'Visa issuance and travel',
        description:
          'If approved, your passport is returned with the visa stamp, typically within a few business days. At the US port of entry, CBP determines your authorized period of stay (typically up to 6 months, annotated on Form I-94).',
        estimatedTime: '3–10 business days for passport return after approval',
      },
    ],
    timeline:
      'The B-1/B-2 visa process typically takes 2–8 weeks from application to issuance, depending on consulate interview appointment wait times, which can range from a few days to several months at busy posts. Once in the US, CBP typically grants stays of up to 6 months, extendable by filing Form I-539 before the authorized stay expires.',
    faqs: [
      {
        question: 'What is the difference between B-1 and B-2?',
        answer:
          'B-1 is for business visitors — attending meetings, conferences, or negotiations — where compensation comes from outside the US. B-2 is for tourism, vacation, visiting family, or medical treatment. Most visas are issued as a combined B-1/B-2, granting both purposes.',
      },
      {
        question: 'Can I work in the US on a B-1/B-2 visa?',
        answer:
          'No. B-1/B-2 holders may not accept employment or receive wages from a US employer. B-1 allows certain unpaid business activities (e.g., attending a board meeting), but productive employment is prohibited.',
      },
      {
        question: 'How long can I stay in the US on a B-1/B-2 visa?',
        answer:
          'The visa validity (often 1–10 years for many nationalities) is not the same as your authorized stay. CBP determines how long you may stay at the port of entry, generally up to 6 months at a time. You can request an extension by filing Form I-539 before your I-94 expires.',
      },
      {
        question: 'Can I apply for a green card while on a B-1/B-2 visa?',
        answer:
          'This is risky. The B-1/B-2 requires nonimmigrant intent. If you apply for a green card (or take other steps toward permanent residence) shortly after entering on a B visa, CBP or USCIS may find you committed fraud or misrepresentation at entry. Consult an immigration attorney before taking such steps.',
      },
      {
        question: 'What if my B-1/B-2 visa application is denied?',
        answer:
          'Most B visa denials are issued under INA Section 214(b), meaning the officer was not convinced you had sufficient nonimmigrant intent. There is no formal appeal process, but you may reapply at any time with stronger evidence of ties to your home country.',
      },
      {
        question: 'Do citizens of certain countries need a B-1/B-2 visa?',
        answer:
          'Citizens of Visa Waiver Program (VWP) countries — including the UK, Germany, Japan, South Korea, Australia, and many others — can travel to the US for up to 90 days without a B visa by obtaining ESTA authorization. However, VWP travelers may not extend their stay or change status, unlike B visa holders.',
      },
    ],
  },

  zh: {
    slug: 'b1b2',
    title: 'B-1/B-2访客签证',
    subtitle: '适用于商务访客（B-1）及旅游或休闲旅行者（B-2）的临时签证',
    overview:
      'B-1/B-2签证是最常见的美国非移民签证，允许外国公民临时入境美国，用于商务（B-1）或旅游、度假、就医及探亲访友（B-2）。大多数申请人会获得合并的B-1/B-2签证。签证本身是一种入境文件，实际获准居留期限由美国海关与边境保护局（CBP）在入境口岸决定，通常最长为6个月。B-1/B-2签证不允许持有人在美国境内工作。',
    eligibility: [
      {
        requirement: '具有合法的临时访问目的',
        details:
          'B-1涵盖商务活动，如参加会议、谈判合同、与商业伙伴磋商或参加专业研讨会。B-2涵盖旅游、度假、探亲访友、就医及参加非职业性文化或体育活动。',
      },
      {
        requirement: '具备非移民意图',
        details:
          '您必须证明与本国有强烈的联系——如就业、房产、家庭或财务关系——足以证明您会在临时访问结束后返回本国。看似有移民倾向的申请人将被拒签。',
      },
      {
        requirement: '具备充足的行程资金',
        details:
          '您须证明有足够的资金支付在美期间的一切费用，或在美国有担保人为您提供经济支持。',
      },
      {
        requirement: '持有效护照且无签证资格限制',
        details:
          '护照有效期须至少超过预计居留期满日6个月。您不得有被驱逐出境记录、特定刑事定罪，或依美国移民法被认定为不可入境的情形。',
      },
      {
        requirement: '无意非法受雇',
        details:
          'B-1/B-2签证持有人不得为美国雇主工作或领取美国薪资。B-1商务活动须为附属于国际业务的活动，且报酬来自境外。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '填写DS-160表格（在线非移民签证申请表）',
        description:
          '在领事电子申请中心（CEAC）网站填写并提交DS-160表格，上传符合要求的照片。保存确认页条形码，面签时需要使用。',
        estimatedTime: '填写约需1–2小时',
      },
      {
        stepNumber: 2,
        title: '缴纳签证申请费并预约面签',
        description:
          '缴纳MRV签证费（B-1/B-2通常为185美元），并在最近的美国大使馆或领事馆预约面签时间。各地等待时间差异较大。',
        estimatedTime: '因领事馆等待时间，从数天到数月不等',
      },
      {
        stepNumber: 3,
        title: '参加领事馆面签',
        description:
          '携带DS-160确认页、护照、缴费收据、照片及证明材料（行程单、银行流水、在职证明、与本国联系的证明）。领事官员将审核您的申请资格。',
        estimatedTime: '面签通常持续2–10分钟',
      },
      {
        stepNumber: 4,
        title: '签证签发与出行',
        description:
          '获批后，护照通常在数个工作日内贴签返还。在美国入境口岸，CBP将决定您的获准居留期限（通常最长6个月，记录于I-94表格）。',
        estimatedTime: '获批后3–10个工作日护照返还',
      },
    ],
    timeline:
      'B-1/B-2签证申请从提交到签发通常需要2–8周，具体取决于领事馆面签预约等待时间（繁忙领事馆可能需要数天至数月）。入境美国后，CBP通常批准最长6个月的居留，如需延期可在授权居留期满前提交I-539表格申请。',
    faqs: [
      {
        question: 'B-1和B-2有何区别？',
        answer:
          'B-1适用于商务访客——参加会议、洽谈或谈判——且报酬来自美国境外。B-2适用于旅游、度假、探亲或就医。大多数签证以B-1/B-2合并形式签发，同时涵盖两种用途。',
      },
      {
        question: '持B-1/B-2签证可以在美国工作吗？',
        answer:
          '不可以。B-1/B-2持有人不得接受雇用或从美国雇主处领取工资。B-1允许某些无薪商务活动（如出席董事会议），但实质性受雇工作被明令禁止。',
      },
      {
        question: '持B-1/B-2签证在美国可以停留多久？',
        answer:
          '签证有效期（许多国籍通常为1至10年）与获准居留期不同。CBP在入境口岸决定您可以停留的时长，一般每次最多6个月。如需延期，须在I-94到期前提交I-539表格申请。',
      },
      {
        question: '持B-1/B-2签证可以申请绿卡吗？',
        answer:
          '这样做存在较大风险。B-1/B-2要求申请人具有非移民意图。如果您在以B签证入境后不久便申请绿卡（或采取其他寻求永久居留的行动），CBP或USCIS可能认定您入境时存在欺诈或虚假陈述。建议在采取此类行动前咨询移民律师。',
      },
      {
        question: 'B-1/B-2签证申请被拒怎么办？',
        answer:
          '大多数B签证被拒依据《移民和国籍法》第214(b)条，即签证官认为申请人未能充分证明其非移民意图。该决定无正式上诉程序，但您可随时重新申请并提供更有力的与本国联系证明。',
      },
      {
        question: '某些国家的公民需要申请B-1/B-2签证吗？',
        answer:
          '免签计划（VWP）成员国公民——包括英国、德国、日本、韩国、澳大利亚等——可通过获得ESTA授权，无需B签证在美停留最多90天。但VWP旅行者不得延长居留期或变更身份，这与B签证持有人不同。',
      },
    ],
  },
};

export default b1b2;
