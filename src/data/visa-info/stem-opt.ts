import type { BilingualVisaInfo } from '@/types/visa-info';

const stemOpt: BilingualVisaInfo = {
  en: {
    slug: 'stem-opt',
    title: 'STEM OPT Extension',
    subtitle: '24-month work authorization extension for graduates of STEM degree programs',
    overview:
      'The STEM OPT Extension allows F-1 students who have earned a qualifying STEM degree (Science, Technology, Engineering, or Mathematics) to extend their initial 12-month OPT by an additional 24 months, for a total of up to 36 months of work authorization. The program requires a formal training plan and active participation from both the student and a qualifying employer enrolled in E-Verify.',
    eligibility: [
      {
        requirement: 'STEM degree from a SEVP-certified school',
        details: 'Your most recent degree must be in an eligible STEM field as listed on the DHS STEM Designated Degree Program List. This includes fields like Computer Science, Engineering, Mathematics, and the Natural Sciences.',
      },
      {
        requirement: 'Currently on valid post-completion OPT',
        details: 'You must be on an active, unexpired 12-month post-completion OPT EAD at the time of application.',
      },
      {
        requirement: 'Employer enrolled in E-Verify',
        details: 'Your employer must be enrolled in the E-Verify program and have an active E-Verify Company ID. Employers that are not enrolled are not eligible to sponsor a STEM OPT extension.',
      },
      {
        requirement: 'Formal training plan (Form I-983)',
        details: 'You and your employer must jointly complete USCIS Form I-983 (Training Plan for STEM OPT Students), outlining learning objectives, mentoring, and how the work is related to your STEM degree.',
      },
      {
        requirement: 'Application filed on time',
        details: 'You must file with USCIS at least 90 days before your current OPT expires. If filed timely, your employment authorization is automatically extended for up to 180 days while the application is pending.',
      },
      {
        requirement: 'Maintained lawful F-1 status throughout OPT',
        details: 'You must have maintained proper F-1 status during your initial OPT period, including reporting requirements and staying within unemployment limits.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Confirm STEM degree eligibility',
        description: 'Verify that your major appears on the DHS STEM Designated Degree Program List. Your DSO can help confirm eligibility using your CIP code.',
        estimatedTime: '1–2 days',
      },
      {
        stepNumber: 2,
        title: 'Complete Form I-983 with your employer',
        description: 'Work with your employer to complete Form I-983. This document outlines your training objectives, salary, and how your role relates to your STEM field. Both you and a company official must sign it.',
        estimatedTime: '1–2 weeks',
      },
      {
        stepNumber: 3,
        title: 'Submit I-983 to DSO and receive new I-20',
        description: 'Provide the signed I-983 to your DSO. The DSO will update your SEVIS record and issue a new I-20 recommending the STEM OPT extension.',
        estimatedTime: '3–7 business days',
      },
      {
        stepNumber: 4,
        title: 'File Form I-765 with USCIS',
        description: 'Submit Form I-765 along with your new I-20, current EAD, passport, I-94, and photos. Pay the $410 filing fee. File at least 90 days before your OPT expires.',
        estimatedTime: '1–2 days',
      },
      {
        stepNumber: 5,
        title: 'Receive 180-day cap-gap extension',
        description: 'If filed on time, USCIS automatically extends your work authorization for up to 180 days while processing your application. Your old EAD plus the receipt notice serve as proof.',
        estimatedTime: 'Automatic upon timely filing',
      },
      {
        stepNumber: 6,
        title: 'Receive new EAD and begin extension',
        description: 'Once approved, you will receive a new EAD valid for 24 months. Continue working under the same employer or find a new one (must be E-Verify enrolled). Report any changes to your DSO.',
        estimatedTime: '3–5 months for USCIS processing',
      },
    ],
    timeline: 'File at least 90 days before OPT expiry. If timely filed, a 180-day auto-extension bridges any processing gap. Total authorization is 24 months (36 months combined with initial OPT).',
    faqs: [
      {
        question: 'Can I switch employers during STEM OPT?',
        answer: 'Yes, but the new employer must also be enrolled in E-Verify. You must complete a new I-983 with the new employer and submit it to your DSO within 10 days.',
      },
      {
        question: 'What is a qualifying STEM field?',
        answer: 'Eligible fields include areas like Computer and Information Sciences, Engineering, Mathematics, Physical Sciences, Biological Sciences, and many others listed on the DHS STEM Designated Degree Program List. Check your degree\'s CIP code against the official list.',
      },
      {
        question: 'Does my employer need to pay me a salary?',
        answer: 'Yes. You must receive compensation commensurate with similarly situated US workers in the same role. Unpaid internships do not qualify for STEM OPT.',
      },
      {
        question: 'How many unemployment days am I allowed on STEM OPT?',
        answer: 'STEM OPT allows a total of 150 days of unemployment (combined with the 90 days from initial OPT, that\'s 150 days total for the STEM extension period). Stay employed to maintain status.',
      },
      {
        question: 'Can I apply for STEM OPT if I used a prior STEM degree?',
        answer: 'In limited cases, yes. You may use a prior STEM degree to apply for a STEM OPT extension on a subsequent non-STEM OPT, but only if the prior degree was earned from a currently SEVP-certified school.',
      },
      {
        question: 'What reporting requirements exist during STEM OPT?',
        answer: 'You must report changes in employer, address, or job title to your DSO within 10 days. Additionally, you and your employer must conduct a formal evaluation using Form I-983 at the 12-month mark.',
      },
    ],
  },

  zh: {
    slug: 'stem-opt',
    title: 'STEM OPT延期',
    subtitle: 'STEM专业毕业生可额外获得24个月工作授权的延期项目',
    overview:
      'STEM OPT延期允许持有理工科（科学、技术、工程或数学）学位的F-1留学生在原有12个月OPT基础上，再延长24个月，总计最多36个月的工作授权。该项目要求学生与雇主共同制定正式培训计划，雇主须已注册E-Verify系统。',
    eligibility: [
      {
        requirement: '持有SEVP认证学校颁发的STEM学位',
        details: '您最近获得的学位必须属于美国国土安全部（DHS）STEM指定专业列表中的合格STEM领域，例如计算机科学、工程、数学及自然科学等。',
      },
      {
        requirement: '当前持有有效的毕业后OPT',
        details: '申请时，您必须持有有效且未过期的12个月毕业后OPT工卡（EAD）。',
      },
      {
        requirement: '雇主已注册E-Verify',
        details: '您的雇主必须已注册E-Verify项目，并拥有有效的E-Verify公司ID。未注册的雇主无法为您申办STEM OPT延期。',
      },
      {
        requirement: '提交正式培训计划（I-983表格）',
        details: '您和雇主须共同填写USCIS I-983表格（STEM OPT学生培训计划），详细说明学习目标、导师制度及工作与STEM学位的关联性。',
      },
      {
        requirement: '在有效期内提交申请',
        details: '您必须在当前OPT到期前至少90天向USCIS提交申请。如按时申请，您的工作授权将自动延长最多180天，以覆盖审理周期。',
      },
      {
        requirement: '在OPT期间始终保持合法的F-1身份',
        details: '在初始OPT期间，您必须符合所有身份维持要求，包括及时报告雇主信息和控制失业天数。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '确认STEM专业资格',
        description: '核实您的专业是否在DHS STEM指定专业列表中。您的DSO可以通过您的CIP代码帮助确认资格。',
        estimatedTime: '1–2天',
      },
      {
        stepNumber: 2,
        title: '与雇主共同完成I-983表格',
        description: '与雇主合作填写I-983表格，内容包括培训目标、薪资待遇以及岗位与STEM专业的关联性。学生和公司负责人须共同签字。',
        estimatedTime: '1–2周',
      },
      {
        stepNumber: 3,
        title: '将I-983提交给DSO，获取新I-20',
        description: '将签署好的I-983提交给您的DSO。DSO将更新SEVIS记录，并签发推荐STEM OPT延期的新I-20表格。',
        estimatedTime: '3–7个工作日',
      },
      {
        stepNumber: 4,
        title: '向USCIS提交I-765表格',
        description: '连同新I-20、当前EAD、护照、I-94及照片一起提交I-765表格，并缴纳410美元申请费。请确保在OPT到期前至少90天提交。',
        estimatedTime: '1–2天',
      },
      {
        stepNumber: 5,
        title: '享受180天过渡期延期',
        description: '如按时申请，USCIS将自动将您的工作授权延长最多180天，以等待审理结果。旧EAD加上收据通知可作为工作授权证明。',
        estimatedTime: '按时申请后自动生效',
      },
      {
        stepNumber: 6,
        title: '收到新EAD，开始延期阶段',
        description: '获批后，您将收到有效期24个月的新EAD。可继续在原雇主处工作，也可更换雇主（新雇主须注册E-Verify）。任何变更须及时告知DSO。',
        estimatedTime: 'USCIS审理约需3–5个月',
      },
    ],
    timeline: '建议在OPT到期前至少90天提交申请。按时申请可获得最多180天自动延期过渡。总授权期为24个月（加上初始OPT共36个月）。',
    faqs: [
      {
        question: 'STEM OPT期间可以换工作吗？',
        answer: '可以，但新雇主也必须已注册E-Verify。换工作后须与新雇主完成新的I-983表格，并在10天内提交给DSO。',
      },
      {
        question: '哪些专业属于合格的STEM领域？',
        answer: '合格领域包括计算机与信息科学、工程、数学、物理科学、生物科学等，完整列表请参考DHS官网的STEM指定专业列表。建议通过您的学位CIP代码比对官方名单。',
      },
      {
        question: '雇主必须向我支付薪资吗？',
        answer: '是的。您的薪资必须与从事同等职位的美国员工相当。不提供薪资的实习不符合STEM OPT的申请条件。',
      },
      {
        question: 'STEM OPT期间允许失业多少天？',
        answer: 'STEM OPT延期阶段共允许150天失业（与初始OPT的90天合并计算后，延期阶段单独还剩150天）。请尽量保持在职状态以维持合法身份。',
      },
      {
        question: '可以用之前的STEM学位申请STEM OPT延期吗？',
        answer: '在某些情况下可以。如果您持有之前的STEM学位（该学位来自仍处于SEVP认证状态的学校），可在非STEM领域的OPT期间以该STEM学位申请延期。',
      },
      {
        question: 'STEM OPT期间有哪些汇报要求？',
        answer: '雇主、地址或职位发生变化时，须在10天内通知DSO。此外，您和雇主须在第12个月时使用I-983表格进行一次正式的阶段性评估。',
      },
    ],
  },
};

export default stemOpt;
