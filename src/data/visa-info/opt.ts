import type { BilingualVisaInfo } from '@/types/visa-info';

const opt: BilingualVisaInfo = {
  en: {
    slug: 'opt',
    title: 'Optional Practical Training (OPT)',
    subtitle: 'Work authorization for F-1 students to gain hands-on experience in their field of study',
    overview:
      'Optional Practical Training (OPT) allows F-1 international students to work in the United States for up to 12 months in a job directly related to their major field of study. OPT can be used before graduation (pre-completion OPT) or after graduation (post-completion OPT). STEM degree holders may be eligible for an additional 24-month extension, for a total of 36 months.',
    eligibility: [
      {
        requirement: 'Valid F-1 student status',
        details: 'You must be currently enrolled or have just completed a full course of study at a SEVP-certified school.',
      },
      {
        requirement: 'Full-time enrollment for at least one academic year',
        details: 'You must have been enrolled full-time for at least one full academic year before applying for post-completion OPT.',
      },
      {
        requirement: 'Job directly related to your major',
        details: 'Employment must be in a position that directly relates to your major field of study as listed on your I-20.',
      },
      {
        requirement: 'No more than 12 months of full-time CPT',
        details: 'Students who have used 12 or more months of full-time Curricular Practical Training (CPT) are ineligible for OPT.',
      },
      {
        requirement: 'DSO recommendation',
        details: 'Your Designated School Official (DSO) must recommend OPT in the SEVIS system and issue a new I-20 with the OPT recommendation.',
      },
      {
        requirement: 'Application submitted on time',
        details: 'You may apply up to 90 days before your program end date and must begin OPT no later than 60 days after program completion.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Request DSO recommendation',
        description: 'Meet with your international student advisor (DSO) at your school to request an OPT recommendation. Provide your requested start date and ensure it fits within the allowed window.',
        estimatedTime: '1–2 weeks',
      },
      {
        stepNumber: 2,
        title: 'Receive updated I-20',
        description: 'Your DSO will update your SEVIS record and issue a new I-20 with the OPT recommendation. Review it carefully for accuracy.',
        estimatedTime: '1–5 business days',
      },
      {
        stepNumber: 3,
        title: 'Prepare Form I-765 and supporting documents',
        description: 'Complete USCIS Form I-765 (Application for Employment Authorization). Gather required documents: new I-20, previous I-20s, passport, visa, I-94, and two passport-style photos.',
        estimatedTime: '1–3 days',
      },
      {
        stepNumber: 4,
        title: 'Submit application to USCIS',
        description: 'Mail your complete application package to the appropriate USCIS service center or file online if eligible. Pay the filing fee (currently $410).',
        estimatedTime: '1 day',
      },
      {
        stepNumber: 5,
        title: 'Wait for EAD card',
        description: 'USCIS will mail you a receipt notice (Form I-797). Processing typically takes 3–5 months. You can check status online with your receipt number.',
        estimatedTime: '3–5 months',
      },
      {
        stepNumber: 6,
        title: 'Begin employment',
        description: 'You may only start working on or after the OPT start date shown on your EAD card. Keep USCIS and your DSO informed of your employer details within 10 days of starting work.',
        estimatedTime: 'After EAD received',
      },
    ],
    timeline: 'Plan for 3–5 months from DSO recommendation to EAD receipt. Apply as early as 90 days before your program end date to allow processing time.',
    faqs: [
      {
        question: 'Can I start working before I receive my EAD card?',
        answer: 'No. You may not begin working until you have your physical EAD card in hand and the OPT start date has arrived.',
      },
      {
        question: 'What happens if I am unemployed during OPT?',
        answer: 'Post-completion OPT allows a maximum of 90 days of unemployment. If you exceed this, you violate your status. Track unemployment days carefully.',
      },
      {
        question: 'Can I travel outside the US during OPT?',
        answer: 'Yes, but make sure you have a valid visa, valid passport, a valid EAD, a job offer or proof of employment, and a DSO travel endorsement on your I-20 dated within 6 months.',
      },
      {
        question: 'Can I change employers on OPT?',
        answer: 'Yes. You can change employers, but you must report any employer changes to your DSO within 10 days and ensure each job is directly related to your major.',
      },
      {
        question: 'Can I do part-time work on post-completion OPT?',
        answer: 'Yes, but working part-time (fewer than 20 hours per week) counts against your unemployment allowance. Full-time employment is strongly recommended to maintain status.',
      },
      {
        question: 'What is the difference between pre-completion and post-completion OPT?',
        answer: 'Pre-completion OPT is used before graduation and counts toward your 12-month total. Post-completion OPT starts after you complete your degree and is the most common type.',
      },
    ],
  },

  zh: {
    slug: 'opt',
    title: '选择性实习培训（OPT）',
    subtitle: '允许F-1留学生在与所学专业相关的领域获得实际工作经验',
    overview:
      '选择性实习培训（OPT）允许持F-1签证的国际学生在美国从事与其所学专业直接相关的工作，时限最长为12个月。OPT可在毕业前使用（毕业前OPT）或毕业后使用（毕业后OPT）。持有STEM专业学位的学生可申请额外24个月的延期，总计最多36个月。',
    eligibility: [
      {
        requirement: '持有有效的F-1学生身份',
        details: '您必须目前在SEVP认证的学校就读，或刚刚完成全日制学习。',
      },
      {
        requirement: '全日制就读满一学年',
        details: '申请毕业后OPT前，您必须在该校全日制就读满一个完整学年。',
      },
      {
        requirement: '工作须与所学专业直接相关',
        details: '工作岗位必须与您I-20表格上所列的专业方向直接相关。',
      },
      {
        requirement: '全日制CPT未超过12个月',
        details: '使用过12个月或以上全日制课程实习培训（CPT）的学生不具备OPT申请资格。',
      },
      {
        requirement: '获得学校DSO的推荐',
        details: '您的学校指定学校官员（DSO）必须在SEVIS系统中为您推荐OPT，并签发带有OPT推荐的新I-20表格。',
      },
      {
        requirement: '在有效期内提交申请',
        details: '您可以在项目结束日期前最多90天提交申请，并且必须在项目完成后60天内开始OPT。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '请求DSO推荐',
        description: '前往学校国际学生办公室与您的DSO会面，提出OPT推荐申请。告知您希望的OPT开始日期，确保在允许的时间范围内。',
        estimatedTime: '1–2周',
      },
      {
        stepNumber: 2,
        title: '获取新的I-20表格',
        description: 'DSO将更新您的SEVIS记录并签发带有OPT推荐的新I-20。请仔细核查表格内容是否准确无误。',
        estimatedTime: '1–5个工作日',
      },
      {
        stepNumber: 3,
        title: '准备I-765表格及相关材料',
        description: '填写美国移民局I-765表格（申请就业授权）。需要准备的材料包括：新旧I-20、护照、签证、I-94、两张护照尺寸照片。',
        estimatedTime: '1–3天',
      },
      {
        stepNumber: 4,
        title: '向USCIS提交申请',
        description: '将完整申请材料邮寄至相应的USCIS服务中心，或在符合条件时在线提交。缴纳申请费（目前为410美元）。',
        estimatedTime: '1天',
      },
      {
        stepNumber: 5,
        title: '等待EAD工卡',
        description: 'USCIS将向您邮寄收据通知（I-797表格）。审理通常需要3至5个月。您可以通过收据编号在网上查询状态。',
        estimatedTime: '3–5个月',
      },
      {
        stepNumber: 6,
        title: '开始工作',
        description: '您只能在EAD卡上所示的OPT开始日期当天或之后开始工作。在开始工作后10天内，请向USCIS和DSO报告雇主信息。',
        estimatedTime: '收到EAD后',
      },
    ],
    timeline: '从DSO推荐到收到EAD大约需要3至5个月。建议在项目结束前最多90天尽早提交申请，以留出足够的审理时间。',
    faqs: [
      {
        question: '收到EAD卡之前可以开始工作吗？',
        answer: '不可以。您必须在拿到实体EAD卡且OPT开始日期到来之后，才可以开始工作。',
      },
      {
        question: 'OPT期间失业会怎样？',
        answer: '毕业后OPT最多允许90天的失业期。超出此限制将违反身份要求，请务必记录并控制失业天数。',
      },
      {
        question: 'OPT期间可以出境吗？',
        answer: '可以，但出境前请确保持有有效签证、有效护照、有效EAD、雇主证明或工作邀请函，以及DSO在6个月内签发的I-20旅行背书。',
      },
      {
        question: 'OPT期间可以换工作吗？',
        answer: '可以。但换工作后必须在10天内通知DSO，并确保每份工作均与您的专业直接相关。',
      },
      {
        question: '毕业后OPT可以兼职工作吗？',
        answer: '可以，但每周工作少于20小时属于兼职，这段时间会计入失业天数。强烈建议保持全职工作以维持合法身份。',
      },
      {
        question: '毕业前OPT和毕业后OPT有什么区别？',
        answer: '毕业前OPT在毕业前使用，计入12个月总额度。毕业后OPT在完成学业后开始，是最常用的类型。',
      },
    ],
  },
};

export default opt;
