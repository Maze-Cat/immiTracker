import type { BilingualVisaInfo } from '@/types/visa-info';

const perm: BilingualVisaInfo = {
  en: {
    slug: 'perm',
    title: 'PERM Labor Certification',
    subtitle: 'Department of Labor certification that a US employer must obtain before sponsoring an employee for an employment-based green card',
    overview:
      'PERM (Program Electronic Review Management) is the process by which a US employer obtains a Labor Certification from the Department of Labor (DOL), certifying that there are no qualified, willing, and available US workers for the position being offered to a foreign worker. PERM is the first and most time-consuming step in the EB-2 and EB-3 green card process. Once approved, the employer can file an I-140 immigrant petition to begin the formal green card process.',
    eligibility: [
      {
        requirement: 'Employer must have a genuine, permanent job opening',
        details: 'The position must be a real, full-time, permanent job. It cannot be a temporary or project-based role.',
      },
      {
        requirement: 'Minimum job requirements must be met',
        details: 'The minimum qualifications listed in the job description must not exceed what is normally required for the position in the US labor market.',
      },
      {
        requirement: 'Beneficiary must meet the minimum requirements',
        details: 'The foreign worker must meet the minimum education, experience, and skill requirements stated in the PERM application at the time of filing.',
      },
      {
        requirement: 'Good-faith recruitment effort',
        details: 'The employer must conduct a genuine, documented recruitment process following DOL regulations, using specific advertising methods, before filing.',
      },
      {
        requirement: 'No qualified US worker applicants',
        details: 'If any US worker who applied and is qualified, willing, and able to take the job, the PERM application cannot be approved.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Prevailing wage determination',
        description: 'The employer requests a Prevailing Wage Determination (PWD) from the DOL\'s National Prevailing Wage Center. The PWD establishes the minimum wage that must be offered to the foreign worker.',
        estimatedTime: '3–6 months',
      },
      {
        stepNumber: 2,
        title: 'Conduct DOL-mandated recruitment',
        description: 'The employer must post the job following specific DOL rules: two Sunday newspaper advertisements, a 30-day job order with the State Workforce Agency, and at least 3 additional recruitment steps. The recruitment period must be completed before filing.',
        estimatedTime: '60–90 days minimum',
      },
      {
        stepNumber: 3,
        title: 'Prepare and audit recruitment results',
        description: 'The employer documents all applicants, conducts interviews, and justifies rejecting US worker applicants. All documentation must be retained for 5 years.',
        estimatedTime: '2–4 weeks',
      },
      {
        stepNumber: 4,
        title: 'File ETA Form 9089 with DOL',
        description: 'The employer submits ETA Form 9089 electronically through the DOL\'s PERM system. The form contains job requirements, wages, and recruitment details.',
        estimatedTime: '1–2 days to prepare and file',
      },
      {
        stepNumber: 5,
        title: 'Wait for DOL decision',
        description: 'DOL reviews the application. Most cases are decided within 6–18 months. A small percentage are selected for audit, which can add 6–12 months.',
        estimatedTime: '6–18 months (longer if audited)',
      },
      {
        stepNumber: 6,
        title: 'Receive certified PERM and file I-140',
        description: 'Once PERM is certified, the employer files Form I-140 (Immigrant Petition for Alien Workers) with USCIS to establish the priority date and visa category.',
        estimatedTime: '6–12 months for I-140 (standard), 15 business days (premium)',
      },
    ],
    timeline: 'PERM takes 12–24 months from prevailing wage determination to I-140 filing. Add 6–12 months if the case is audited. The earlier you start, the earlier your I-140 priority date.',
    faqs: [
      {
        question: 'Why does the priority date matter?',
        answer: 'The I-140 approval date becomes your priority date, which determines your place in the green card queue. Earlier priority dates result in shorter waits for a visa number, especially for oversubscribed countries like China and India.',
      },
      {
        question: 'Can the foreign worker help with recruitment?',
        answer: 'No. The foreign worker (beneficiary) must not be involved in the recruitment process. Only the employer and its attorneys may conduct and evaluate recruitment.',
      },
      {
        question: 'What happens if PERM is audited?',
        answer: 'DOL may request additional documentation (audit). The employer has 30 days to respond. An audit does not mean denial, but it adds 6–12 months to the timeline.',
      },
      {
        question: 'Can the job requirements be customized for the foreign worker?',
        answer: 'No. The PERM regulations prohibit "tailoring" — setting requirements that only the foreign worker happens to meet. The minimum requirements must reflect what is genuinely needed for the role.',
      },
      {
        question: 'Does PERM need to be repeated when changing employers?',
        answer: 'Yes, unless you invoke AC21 portability after 180 days of pending I-485 in the same or similar occupational category. PERM approval is tied to a specific employer and position.',
      },
      {
        question: 'Can I change jobs after PERM is approved but before green card approval?',
        answer: 'You may be able to use AC21 portability to transfer to a same or similar job once your I-485 has been pending for 180 days. Your approved I-140 priority date generally remains intact.',
      },
    ],
  },

  zh: {
    slug: 'perm',
    title: 'PERM劳工证',
    subtitle: '美国雇主在为员工申请职业移民绿卡前，须向劳工部申请的劳工认证',
    overview:
      'PERM（电子劳工证审查系统）是美国雇主向劳工部（DOL）申请劳工认证的流程，旨在证明当前没有符合条件、且愿意并能够胜任该职位的美国本地劳工。PERM是EB-2和EB-3职业移民绿卡流程的第一步，也是耗时最长的环节。PERM获批后，雇主可向USCIS提交I-140移民请愿书，正式启动绿卡申请程序。',
    eligibility: [
      {
        requirement: '雇主须有真实的永久性职位空缺',
        details: '该职位必须是真实存在的全职永久性工作，不能是临时性或项目性岗位。',
      },
      {
        requirement: '职位最低要求须合理',
        details: '招聘广告中列出的最低资历要求不得超过美国劳动力市场对同类职位的通常要求。',
      },
      {
        requirement: '外籍员工须满足最低要求',
        details: '申请提交时，外籍员工（受益人）必须符合PERM申请中所列的最低学历、工作经验及技能要求。',
      },
      {
        requirement: '须进行真实的招聘行为',
        details: '雇主须按照劳工部规定，进行有据可查的真实招聘，使用特定的广告方式，并在提交申请前完成整个招聘流程。',
      },
      {
        requirement: '不存在合格的美国应聘者',
        details: '如果有符合条件、有意愿且能够胜任该职位的美国劳工应聘，PERM申请将无法获批。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '申请当地通行工资认定',
        description: '雇主向劳工部国家通行工资中心申请当地通行工资认定（PWD），确定向外籍员工提供的最低薪资标准。',
        estimatedTime: '3–6个月',
      },
      {
        stepNumber: 2,
        title: '按劳工部要求开展招聘活动',
        description: '雇主须按特定规则发布职位招聘：两次周日报纸广告、在州劳工机构发布30天的岗位信息，以及至少3项额外招聘措施。招聘期须在提交申请前完成。',
        estimatedTime: '至少60–90天',
      },
      {
        stepNumber: 3,
        title: '整理并评估招聘结果',
        description: '雇主须记录所有应聘者信息、开展面试，并对拒绝美国应聘者的理由进行书面记录。所有文件须保存5年。',
        estimatedTime: '2–4周',
      },
      {
        stepNumber: 4,
        title: '通过劳工部系统提交ETA 9089表格',
        description: '雇主通过劳工部PERM系统在线提交ETA 9089表格，内容涵盖职位要求、薪资及招聘详情。',
        estimatedTime: '准备及提交约需1–2天',
      },
      {
        stepNumber: 5,
        title: '等待劳工部审查',
        description: '劳工部对申请进行审核。大多数案件在6至18个月内作出裁决。少数案件会被选中进行审计，可额外增加6至12个月。',
        estimatedTime: '6–18个月（如被审计时间更长）',
      },
      {
        stepNumber: 6,
        title: '获批PERM后提交I-140请愿书',
        description: 'PERM获批后，雇主向USCIS提交I-140表格（外国劳工移民请愿书），以确立优先日期和签证类别。',
        estimatedTime: 'I-140标准审理6–12个月；加急处理15个工作日',
      },
    ],
    timeline: '从申请通行工资认定到提交I-140，整个PERM流程通常需要12至24个月。如被审计，可能再增加6至12个月。越早开始，优先日期越靠前。',
    faqs: [
      {
        question: '优先日期为什么重要？',
        answer: 'I-140获批日期即为您的优先日期，决定您在绿卡排队中的位置。优先日期越早，等待签证排期的时间越短，对于中国和印度等供不应求的国家尤为关键。',
      },
      {
        question: '外籍员工可以参与招聘过程吗？',
        answer: '不可以。PERM申请的受益人（外籍员工）不得参与任何招聘活动。招聘工作只能由雇主及其委托的律师负责。',
      },
      {
        question: 'PERM被审计怎么办？',
        answer: '劳工部可能要求提供补充材料（审计）。雇主有30天时间回复。被审计并不意味着被拒，但会为审理周期增加6至12个月。',
      },
      {
        question: '职位要求可以针对外籍员工量身定制吗？',
        answer: '不可以。PERM法规明确禁止"量身定制"——即设置只有该外籍员工才恰好符合的要求。最低要求必须真实反映职位的实际需求。',
      },
      {
        question: '换工作后需要重新申请PERM吗？',
        answer: '一般情况下需要重新申请，除非您的I-485已挂起超过180天，且可以援引AC21可携带规则转到同一或相近职业类别的新雇主。PERM批准与特定雇主和职位绑定。',
      },
      {
        question: 'PERM获批后、绿卡获批前可以换工作吗？',
        answer: '如果您的I-485已挂起满180天，可通过AC21可携带规则转至同一或相近的职位。已批准的I-140优先日期通常得以保留。',
      },
    ],
  },
};

export default perm;
