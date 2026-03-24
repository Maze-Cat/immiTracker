import type { BilingualVisaInfo } from '@/types/visa-info';

const greenCard: BilingualVisaInfo = {
  en: {
    slug: 'green-card',
    title: 'Employment-Based Green Card',
    subtitle: 'Permanent resident status through employer sponsorship in the EB-1, EB-2, or EB-3 preference categories',
    overview:
      'An employment-based green card (lawful permanent residence) allows a foreign national to live and work permanently in the United States. The most common employment-based categories are EB-1 (extraordinary ability, outstanding professors, and multinational managers), EB-2 (advanced degree or exceptional ability, including National Interest Waiver self-petition), and EB-3 (skilled workers and professionals). The process typically involves PERM labor certification, an I-140 immigrant petition, and finally an I-485 adjustment of status (or consular processing if abroad).',
    eligibility: [
      {
        requirement: 'EB-1A: Extraordinary ability in science, arts, education, business, or athletics',
        details: 'Must demonstrate sustained national or international acclaim through extensive documentation, such as major awards, published work, high salary, or judging the work of peers. No employer sponsor required — can self-petition.',
      },
      {
        requirement: 'EB-1B: Outstanding professors and researchers',
        details: 'Must have at least 3 years of experience and international recognition in a specific academic field. Requires a job offer from a university or qualifying research institution.',
      },
      {
        requirement: 'EB-1C: Multinational managers and executives',
        details: 'Must have been employed abroad for at least 1 of the last 3 years in a managerial or executive capacity for an affiliate, parent, or subsidiary of the US employer.',
      },
      {
        requirement: 'EB-2: Advanced degree or exceptional ability',
        details: 'Must hold a US master\'s degree (or foreign equivalent), or a bachelor\'s plus 5 years progressive experience, in a field related to the position. Alternatively, EB-2 NIW allows self-petition if the work is in the US national interest.',
      },
      {
        requirement: 'EB-3: Skilled worker or professional',
        details: 'Skilled workers must have a job offer for a position requiring at least 2 years training or experience. Professionals must have a US bachelor\'s degree (or equivalent) for the offered position.',
      },
      {
        requirement: 'Priority date must be current',
        details: 'A visa number must be available for your category and country of chargeability before USCIS will approve the final green card. Check the monthly Visa Bulletin for wait times.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'PERM Labor Certification (EB-2 / EB-3)',
        description: 'For EB-2 (unless NIW) and EB-3, the employer must obtain an approved PERM Labor Certification from the DOL. EB-1 and EB-2 NIW skip this step.',
        estimatedTime: '12–24 months',
      },
      {
        stepNumber: 2,
        title: 'File I-140 Immigrant Petition',
        description: 'The employer (or you, for self-petition categories) files Form I-140 with USCIS. This establishes your priority date and confirms you qualify for the immigrant category. Premium processing is available for 15 business days.',
        estimatedTime: '6–12 months (standard), 15 business days (premium)',
      },
      {
        stepNumber: 3,
        title: 'Wait for priority date to become current',
        description: 'Consult the DOS Visa Bulletin monthly. The Final Action Dates chart tells you when your priority date is current. For China and India EB-2/EB-3, waits can be many years. EB-1 is often current.',
        estimatedTime: 'Varies: immediate to 10+ years (country and category dependent)',
      },
      {
        stepNumber: 4,
        title: 'File I-485 Adjustment of Status (or consular processing)',
        description: 'When your priority date is current, file Form I-485 (Application to Register Permanent Residence) with USCIS if you are in the US. If abroad, attend an immigrant visa interview at a US consulate. You can also file I-485 when the Dates for Filing chart is current (if USCIS authorizes it).',
        estimatedTime: '8–24 months for I-485 adjudication',
      },
      {
        stepNumber: 5,
        title: 'Biometrics and interview',
        description: 'USCIS will schedule you for biometrics (fingerprints and photo). A personal interview may be required, especially if your case is complex or you have been in the US fewer than 2 years.',
        estimatedTime: 'Scheduled during I-485 processing',
      },
      {
        stepNumber: 6,
        title: 'Receive green card',
        description: 'Upon approval, USCIS mails you your Permanent Resident Card (green card), valid for 10 years. You may renew it indefinitely or apply for naturalization after 5 years (3 years if married to a US citizen).',
        estimatedTime: 'Upon I-485 approval',
      },
    ],
    timeline: 'EB-1: as fast as 1–2 years total (no PERM, often current priority date). EB-2/EB-3 for most countries: 3–6 years. EB-2/EB-3 for China or India: potentially 10–20+ years due to per-country caps.',
    faqs: [
      {
        question: 'What is a priority date?',
        answer: 'Your priority date is essentially your place in the green card queue. For most categories it is the date USCIS receives your I-140 petition. For PERM cases it is the date DOL receives your PERM application.',
      },
      {
        question: 'Can I work for a different employer while I-485 is pending?',
        answer: 'Yes, under AC21 portability. If your I-485 has been pending for 180+ days and you move to a same or similar occupational role, your I-485 remains valid and your I-140 priority date is preserved.',
      },
      {
        question: 'What is the EB-2 National Interest Waiver (NIW)?',
        answer: 'NIW allows individuals of exceptional ability or those with advanced degrees to self-petition for an EB-2 green card without employer sponsorship or PERM, if their work is deemed to be in the national interest of the US.',
      },
      {
        question: 'Can I apply for a green card if I entered the US without inspection?',
        answer: 'Generally you must be in valid legal status in the US to adjust status. Exceptions exist for immediate relatives of US citizens (INA 245(i)) and certain humanitarian cases. Otherwise, consular processing abroad may be required.',
      },
      {
        question: 'Do I need to maintain H-1B status while I-485 is pending?',
        answer: 'Technically no, once I-485 is filed, but practically yes — maintaining H-1B ensures work authorization via the H-1B and provides a safety net if I-485 is denied. Many people travel on their H-1B rather than using Advance Parole.',
      },
      {
        question: 'What is the difference between Final Action Dates and Dates for Filing?',
        answer: 'Final Action Dates determine when USCIS can actually approve your I-485. Dates for Filing (if authorized by USCIS) determine when you can submit your I-485 ahead of your priority date becoming "final" — a way to get in line earlier and obtain EAD/AP benefits sooner.',
      },
      {
        question: 'Can my family members get green cards through my application?',
        answer: 'Yes. Derivative beneficiaries (spouse and unmarried children under 21) can be included in your I-140 and can file their own I-485 or pursue consular processing when your priority date is current.',
      },
    ],
    additionalSections: [
      {
        icon: '🎯',
        title: 'NIW (National Interest Waiver) Preparation Guide',
        content: 'The EB-2 National Interest Waiver allows you to self-petition for a green card without employer sponsorship or PERM labor certification. Under the Dhanasar framework (Matter of Dhanasar, 2016), you must demonstrate three prongs: (1) your proposed endeavor has substantial merit and national importance, (2) you are well positioned to advance the endeavor, and (3) on balance, it would be beneficial to waive the job offer and labor certification requirements.',
        bullets: [
          'Publications & Citations — Peer-reviewed journal articles, conference papers, and citation counts demonstrating your impact in the field.',
          'Recommendation Letters — 5–8 strong letters from independent experts (not just collaborators) who can speak to the national importance of your work.',
          'A Clear Proposed Endeavor — Define a specific, forward-looking plan for your work in the US that addresses a nationally important issue.',
          'Evidence of National Impact — Patents, media coverage, government grants, or adoption of your work by industry or policy makers.',
          'Personal Qualifications — Advanced degrees, awards, professional memberships, and a track record of success in your field.',
          'Dual-Track Strategy — Many applicants file NIW alongside a PERM-based EB-2 or EB-3 to hedge against processing delays or denial.',
          'Premium Processing — Available for I-140 petitions, guaranteeing a response within 15 business days for an additional fee.',
        ],
      },
    ],
  },

  zh: {
    slug: 'green-card',
    title: '职业移民绿卡',
    subtitle: '通过雇主担保，在EB-1、EB-2或EB-3优先类别下获得美国永久居留权',
    overview:
      '职业移民绿卡（合法永久居民身份）允许外国公民永久在美国居住和工作。最常见的职业移民类别包括EB-1（杰出才能、杰出教授研究员和跨国公司高管）、EB-2（高等学历或特殊才能，包含国家利益豁免NIW可自行申请）和EB-3（技术工人和专业人士）。整个流程通常包括PERM劳工证申请、I-140移民请愿书，以及最终的I-485身份调整（如在境外则进行领事馆移民签证面谈）。',
    eligibility: [
      {
        requirement: 'EB-1A：科学、艺术、教育、商业或体育领域的杰出才能',
        details: '须通过大量文件证明持续性的国内外杰出成就，例如重大奖项、已发表的学术成果、高薪待遇或担任同行评审评委等。无需雇主担保，可自行申请。',
      },
      {
        requirement: 'EB-1B：杰出教授及研究员',
        details: '须在特定学术领域拥有至少3年工作经验并在国际上享有认可。需要来自高校或合格研究机构的工作邀请。',
      },
      {
        requirement: 'EB-1C：跨国公司高管',
        details: '在过去3年中，须在美国雇主的境外关联公司、母公司或子公司担任管理或高管职务至少1年。',
      },
      {
        requirement: 'EB-2：高等学历或特殊才能',
        details: '须持有与职位相关的美国硕士学位（或同等外国学历），或学士学位加5年以上递进式工作经验。EB-2 NIW允许在工作具有美国国家利益的情况下自行申请，无需雇主担保。',
      },
      {
        requirement: 'EB-3：技术工人或专业人士',
        details: '技术工人须持有至少需要2年培训或经验的职位邀请函；专业人士须持有美国学士学位（或同等学历），且该学历适用于所申请职位。',
      },
      {
        requirement: '优先日期须已排到',
        details: '您所在类别和出生国对应的签证名额须已开放，USCIS才能最终批准绿卡。请每月查阅签证公告，了解最新排期情况。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'PERM劳工证（EB-2 / EB-3适用）',
        description: 'EB-2（NIW除外）和EB-3申请须由雇主先向劳工部申请获批PERM劳工证。EB-1和EB-2 NIW无需此步骤。',
        estimatedTime: '12–24个月',
      },
      {
        stepNumber: 2,
        title: '提交I-140移民请愿书',
        description: '由雇主（或自行申请类别由本人）向USCIS提交I-140表格，确立优先日期并证明您符合移民类别要求。可选加急处理，承诺15个工作日内完成。',
        estimatedTime: '标准审理6–12个月；加急处理15个工作日',
      },
      {
        stepNumber: 3,
        title: '等待优先日期排到',
        description: '每月查阅美国国务院签证公告。最终行动日期表显示您的优先日期是否已经排到。对于中国和印度的EB-2/EB-3申请，等待时间可能长达数年。EB-1通常无需等待。',
        estimatedTime: '因国籍和类别而异：从即时到10年以上不等',
      },
      {
        stepNumber: 4,
        title: '提交I-485身份调整申请（或领事馆处理）',
        description: '当优先日期排到时，如您在美国境内，可向USCIS提交I-485（永久居留申请）。如在境外，须前往美国领事馆参加移民签证面谈。如USCIS授权，也可在"提交日期"排到时提前递交I-485。',
        estimatedTime: 'I-485审理约需8–24个月',
      },
      {
        stepNumber: 5,
        title: '生物特征采集及面谈',
        description: 'USCIS将安排生物特征采集（指纹和照片）。对于较复杂的案件或在美居住不满2年者，可能需要参加移民官面谈。',
        estimatedTime: '在I-485审理期间安排',
      },
      {
        stepNumber: 6,
        title: '收到绿卡',
        description: '申请获批后，USCIS将邮寄给您有效期10年的永久居民卡（绿卡）。您可以无限期续签，或在获得绿卡后满5年（若与美国公民结婚则满3年）后申请入籍。',
        estimatedTime: 'I-485获批后',
      },
    ],
    timeline: 'EB-1：最快1–2年（无需PERM，优先日期通常无需等待）。大多数国籍的EB-2/EB-3：3–6年。中国和印度的EB-2/EB-3：因每国名额限制，可能需等待10至20年甚至更长。',
    faqs: [
      {
        question: '什么是优先日期？',
        answer: '优先日期相当于您在绿卡排队中的位置编号。对大多数类别而言，优先日期为USCIS收到I-140请愿书的日期；对于PERM案件，则为劳工部收到PERM申请的日期。',
      },
      {
        question: 'I-485挂起期间可以换工作吗？',
        answer: '可以，依据AC21可携带规则。如果您的I-485已挂起超过180天，且转到同一或相近的职业类别，您的I-485仍然有效，I-140优先日期也得以保留。',
      },
      {
        question: '什么是EB-2国家利益豁免（NIW）？',
        answer: 'NIW允许具有特殊才能或高等学历的人士自行申请EB-2绿卡，无需雇主担保或PERM，前提是其工作被认定符合美国国家利益。',
      },
      {
        question: '无合法身份入境的人可以申请绿卡吗？',
        answer: '一般情况下，在美国境内调整身份须处于合法状态。美国公民直系亲属等特殊情况存在例外规定。否则，可能需要通过领事馆在境外处理移民签证。',
      },
      {
        question: 'I-485挂起期间是否需要保持H-1B身份？',
        answer: '从严格法律意义上讲，I-485提交后不强制要求，但实际操作中建议保持。保持H-1B身份可确保工作授权，也是I-485被拒时的安全保障。许多人选择以H-1B而非预先入境许可（Advance Parole）出境。',
      },
      {
        question: '最终行动日期和提交日期有什么区别？',
        answer: '最终行动日期决定USCIS何时可以正式批准您的I-485。提交日期（如USCIS授权）允许您在最终行动日期到来之前提前递交I-485，从而更早进入排队序列，并尽早获得EAD和预先入境许可。',
      },
      {
        question: '我的家庭成员可以随我一起申请绿卡吗？',
        answer: '可以。配偶和21岁以下未婚子女作为随行受益人，可被纳入您的I-140申请，在您的优先日期排到后各自提交I-485或进行领事馆程序。',
      },
    ],
    additionalSections: [
      {
        icon: '🎯',
        title: 'NIW（国家利益豁免）准备指南',
        content: 'EB-2国家利益豁免允许您在无需雇主担保或PERM劳工证的情况下自行申请绿卡。依据Dhanasar框架（Matter of Dhanasar, 2016），您须证明三个要素：(1) 您提议的事业具有实质性价值和国家级重要性；(2) 您有充分条件推进该事业；(3) 综合衡量，豁免工作邀请和劳工证要求对美国有利。',
        bullets: [
          '学术发表与引用 — 同行评审期刊论文、会议论文及引用数量，证明您在该领域的影响力。',
          '推荐信 — 5至8封来自独立专家（不仅是合作者）的有力推荐信，专门阐述您工作的国家级重要性。',
          '明确的拟议事业 — 定义一个具体的、前瞻性的在美工作计划，针对国家级重要议题。',
          '国家级影响力证据 — 专利、媒体报道、政府资助、或您的工作被行业或政策制定者采纳的证据。',
          '个人资质 — 高等学历、奖项、专业会员资格以及在相关领域的成功履历。',
          '双轨策略 — 许多申请人同时提交NIW和基于PERM的EB-2或EB-3申请，以对冲审理延迟或拒签风险。',
          '加急处理 — I-140请愿书可申请加急处理，支付额外费用后保证15个工作日内获得回复。',
        ],
      },
    ],
  },
};

export default greenCard;
