'use client';

import { useState, type ReactNode } from 'react';
import {
  Activity, BadgeCheck, BarChart3, Bell, BookOpen, BriefcaseBusiness, Building2,
  CalendarDays, Check, ChevronRight, CircleDollarSign, ClipboardCheck, Clock3,
  Cloud, FileCheck2, FileText, FolderKanban, Gem, GraduationCap, Headphones,
  HeartHandshake, Home, Landmark, LockKeyhole, Megaphone, MessageCircleMore,
  PackageSearch, PieChart, Search, Settings2, ShieldCheck, Sparkles, Star,
  Target, TrendingUp, UserRound, UserRoundPlus, UsersRound, WalletCards,
} from 'lucide-react';

type IconType = typeof Home;
type ScreenDef = { title:string; eyebrow:string; mode:'light'|'dark'; component:() => ReactNode };

function Halo({ large=false, label='AI' }:{ large?:boolean; label?:string }) {
  return <span className={`halo ${large?'halo-large':'halo-small'}`}><span>{label}</span></span>;
}

function StatusBar() { return <div className="status-row"><span>9:41</span><span className="status-icons">●●●&nbsp; 5G&nbsp; ▰</span></div>; }

function Avatar({ children, dark=false }:{ children:ReactNode; dark?:boolean }) {
  return <span className={`avatar ${dark?'avatar-ai':''}`}>{children}</span>;
}

function Topbar({ title, subtitle, initial='施', dark=false, simple=false }:{ title:string; subtitle?:string; initial?:string; dark?:boolean; simple?:boolean }) {
  if(simple) return <header className="topbar simple-top"><b>{title}</b><span className="top-actions"><Search size={18}/></span></header>;
  return <header className="topbar"><div className="user-line"><Avatar dark={dark}>{initial}</Avatar><div><b>{title}</b>{subtitle&&<small>{subtitle}</small>}</div></div><span className="top-actions"><Search size={17}/><Bell size={17}/></span></header>;
}

function SectionTitle({ children, more }:{ children:ReactNode; more?:string }) {
  return <div className="section-title"><b>{children}</b>{more&&<span>{more} <ChevronRight size={12}/></span>}</div>;
}

function Tag({ children, tone='purple' }:{ children:ReactNode; tone?:'purple'|'gray'|'red'|'green'|'gold' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

function GridMenu({ items, columns=4 }:{ items:[IconType,string][]; columns?:number }) {
  return <div className="grid-menu" style={{gridTemplateColumns:`repeat(${columns},1fr)`}}>{items.map(([Icon,label])=><div className="grid-option" key={label}><span className="grid-icon"><Icon size={19}/></span><small>{label}</small></div>)}</div>;
}

function Suggestion({ children, action, compact=false }:{ children:ReactNode; action?:string; compact?:boolean }) {
  return <div className={`suggestion ${compact?'compact':''}`}><Halo/><div className="suggestion-copy">{children}{action&&<button>{action}</button>}</div></div>;
}

function BottomNav({ items, active=0, dark=false }:{ items:[IconType,string][]; active?:number; dark?:boolean }) {
  return <footer className={`bottom-nav ${dark?'bottom-dark':''}`}>{items.map(([Icon,label],i)=><div className={i===active?'active':''} key={label}><Icon size={18}/><small>{label}</small></div>)}</footer>;
}

function Phone({ children, dark=false, nav }:{ children:ReactNode; dark?:boolean; nav?:ReactNode }) {
  return <div className={`phone-frame ${dark?'dark-screen':'light-screen'}`}><div className="island"/><StatusBar/><div className={`phone-scroll ${nav?'with-nav':''}`}>{children}</div>{nav}</div>;
}

const companyNav:[IconType,string][]=[[Home,'首頁'],[FolderKanban,'平台'],[TrendingUp,'業務'],[Sparkles,'AI助手'],[UserRound,'我的']];
const advisorNav:[IconType,string][]=[[Home,'首頁'],[GraduationCap,'學院'],[TrendingUp,'業務'],[UsersRound,'社群'],[UserRound,'我的']];
const aiNav:[IconType,string][]=[[Home,'首頁'],[MessageCircleMore,'AI陪伴'],[FolderKanban,'工作台'],[PackageSearch,'AI商城'],[UserRound,'我的']];

function IdentityScreen() {
  const roles:[IconType,string,string][]=[
    [Building2,'公司管理入口','管理層、行政、人事、財務、合規與運營'],
    [BriefcaseBusiness,'家辦顧問入口','IFA、保險顧問、家辦顧問與合作伙伴'],
    [Gem,'個人 / 客戶入口','高淨值客戶、企業主、家庭用戶與準會員'],
  ];
  return <Phone dark><div className="identity-page"><div className="identity-hero"><Halo large label="AA"/><p className="kicker">FAMILY OFFICE · AI COPILOT</p><h2>AA AI 家辦系統</h2><p>為公司、團隊、顧問與客戶打造的<br/>一站式 AI 工作平台</p></div><div className="role-stack">{roles.map(([Icon,title,desc])=><article className="role-card" key={title}><span className="role-icon"><Icon size={22}/></span><div><h3>{title}</h3><p>{desc}</p></div><ChevronRight size={17}/></article>)}</div><div className="remember"><span/>下次自動記住我的身份</div></div></Phone>;
}

function CompanyHome() {
  const manage:[IconType,string][]=[[UsersRound,'我的圈子'],[CalendarDays,'我的日程'],[WalletCards,'我的財務'],[BarChart3,'數據中心']];
  const internal:[IconType,string][]=[[FileText,'合約管理'],[BookOpen,'公司制度'],[Clock3,'考勤管理'],[TrendingUp,'業務進度'],[HeartHandshake,'IFA 合約'],[BadgeCheck,'業務評估'],[CircleDollarSign,'分傭機制'],[Landmark,'保司渠道']];
  return <Phone nav={<BottomNav items={companyNav}/>}><Topbar title="施麗麗" subtitle="卓越團隊始創人 · 管理層"/><SectionTitle>今日總覽</SectionTitle><div className="data-grid"><Data num="6" label="待審合約"/><Data num="3" label="待批費用"/><Data num="4" label="待入職 IFA"/><Data num="68%" label="業務完成率"/></div><div className="hero-banner"><Tag tone="gray">系統公告</Tag><h2>AA AI 家辦系統正式啟動</h2><p>讓每一位顧問都有自己的 AI 陪跑教練</p><i/></div><SectionTitle>AI 今日建議</SectionTitle><Suggestion compact>本週有 <b>3 份 IFA 合約</b>即將到期，建議優先安排續約審批。</Suggestion><SectionTitle more="更多">我的管理</SectionTitle><GridMenu items={manage}/><SectionTitle>內部管理系統</SectionTitle><GridMenu items={internal}/><button className="ai-float"><Sparkles size={18}/> AI</button></Phone>;
}

function Data({num,label,tone}:{num:string;label:string;tone?:'red'}) { return <div className="data-pill"><b className={tone==='red'?'red':''}>{num}</b><small>{label}</small></div>; }

function ProgressRing({value,label='完成率'}:{value:number;label?:string}) { return <div className="progress-ring" style={{background:`conic-gradient(var(--violet) ${value}%, #ececf2 0)`}}><div><b>{value}%</b><small>{label}</small></div></div>; }

function AdvisorHome() {
  const tools:[IconType,string][]=[[PackageSearch,'產品資料'],[PieChart,'產品對比'],[CircleDollarSign,'保費試算'],[Activity,'客戶診斷'],[Megaphone,'營銷工具'],[GraduationCap,'培訓學院'],[FileCheck2,'計劃書'],[Sparkles,'AI成交陪跑']];
  return <Phone nav={<BottomNav items={advisorNav}/>}><Topbar title="陳小姐　·　鑽石顧問" subtitle="卓越團隊 · 家辦顧問" initial="陳"/><div className="kpi-card"><ProgressRing value={64}/><div className="kpi-copy"><small>本月業務目標</small><h2>HKD 3,200,000</h2><p>/ 5,000,000</p><div className="progress"><i style={{width:'64%'}}/></div><div className="mini-metrics"><span>新客戶 <b>48</b></span><span>有效面談 <b>31</b></span><span>成交 <b>7</b></span></div></div></div><SectionTitle more="全部">今日任務</SectionTitle><Suggestion compact><b>AI 建議：</b>優先跟進 5 位高意向客戶，其中 2 位計劃書已逾 3 天未回覆。</Suggestion><div className="list-card"><List icon={Headphones} title="跟進客戶 · 黃先生" sub="教育金規劃 · 二次面談" tag="進行中"/><List icon={FileCheck2} title="遞交計劃書 · 李太太" sub="高端醫療 + 儲蓄型組合" tag="待處理" gray/><List icon={CalendarDays} title="家辦財富傳承閉門會" sub="10月18日 · 中環 · 已報名 22/30" tag="已確認" green/></div><SectionTitle>快捷工具</SectionTitle><GridMenu items={tools}/><button className="ai-float"><Sparkles size={18}/> AI</button></Phone>;
}

function List({icon:Icon,title,sub,tag,gray=false,green=false,red=false}:{icon:IconType;title:string;sub:string;tag?:string;gray?:boolean;green?:boolean;red?:boolean}) { return <div className="list-row"><span className="list-icon"><Icon size={17}/></span><div><b>{title}</b><small>{sub}</small></div>{tag&&<Tag tone={green?'green':red?'red':gray?'gray':'purple'}>{tag}</Tag>}</div>; }

function AICompanion() {
  const tools:[IconType,string][]=[[Activity,'AI客戶診斷'],[PackageSearch,'AI產品建議'],[MessageCircleMore,'AI話術教練'],[Target,'AI招募陪跑'],[CalendarDays,'AI活動策劃'],[TrendingUp,'AI成交復盤'],[FileText,'AI合約問答'],[BarChart3,'AI週報生成']];
  return <Phone dark nav={<BottomNav items={aiNav} active={1} dark/>}><Topbar dark title="早上好，陳小姐" subtitle="今天是你的 AI 家辦陪跑日" initial="陳"/><div className="ai-hero"><Halo large label="AI"/><h2>你的今日陪跑計劃已就緒</h2><p>已綜合客戶、招募、活動與合約進度</p></div><SectionTitle>AI 今日建議</SectionTitle><Suggestion action="立即跟進">今日應跟進 <b>8 位客戶</b>，其中 2 位計劃書已超過 3 天未回覆</Suggestion><Suggestion action="安排面談"><b>3 個招募候選人</b>需要二次面談，建議本週內完成</Suggestion><Suggestion action="生成文案">本週活動報名率 <b>68%</b>，建議發布 2 條內容催谷報名</Suggestion><SectionTitle>AI 工具</SectionTitle><GridMenu items={tools}/><button className="primary-ai"><Sparkles size={17}/>開始今日 AI 陪跑</button></Phone>;
}

function InternalManagement() {
  return <Phone nav={<BottomNav items={companyNav} active={1}/>}><Topbar simple title="內部管理系統"/><div className="tabs"><b>合約管理</b><span>公司制度</span><span>考勤管理</span><span>分傭機制</span><span>審批中心</span></div><div className="data-grid cols-3"><Data num="128" label="生效中"/><Data num="6" label="待審批" tone="red"/><Data num="3" label="即將到期" tone="red"/></div><div className="list-head"><SectionTitle>合約列表</SectionTitle><span className="filter-chip">全部合約⌄</span></div><div className="list-card"><List icon={FileText} title="IFA 合作協議 · 黃志明" sub="生效日 2024-11-02 · 3年期" tag="7天後到期" red/><List icon={FileText} title="保司渠道協議 · 友邦" sub="部門：保司渠道 · 續約審核中" tag="待審" gray/><List icon={FileText} title="服務協議 · 家辦顧問團隊 B" sub="生效日 2025-01-15" tag="生效中" green/><List icon={FileText} title="費用報銷合約 · Q3" sub="財務部提交 · 待管理層審批" tag="待審" gray/><List icon={FileText} title="IFA 合作協議 · 李嘉欣" sub="生效日 2023-06-20 · 已續約" tag="生效中" green/></div><SectionTitle>AI 提醒</SectionTitle><Suggestion compact>本週共 <b>3 份合約</b>將到期，建議提前 14 天發起續約通知。</Suggestion></Phone>;
}

function Recruitment() {
  const perks:[IconType,string][]=[[Landmark,'高端家辦平台'],[Sparkles,'AI 陪跑賦能'],[GraduationCap,'系統化培訓']];
  return <Phone nav={<BottomNav items={companyNav} active={1}/>}><Topbar simple title="人才招募系統"/><div className="recruit-hero"><p>JOIN THE FUTURE</p><h2>成為家辦顧問</h2><span>不只是保險代理，而是家庭財富顧問</span><div><button>立即了解</button><button>預約面談</button></div><Target size={82}/></div><SectionTitle>你的成長優勢</SectionTitle><GridMenu items={perks} columns={3}/><SectionTitle>本月招募漏斗</SectionTitle><div className="funnel-card"><div className="funnel-numbers"><span><b>62</b>接觸</span><span><b>43</b>面談</span><span><b>24</b>複試</span><span><b>9</b>入職</span></div><div className="funnel"><i/><i/><i/><i/></div></div><SectionTitle more="全部候選人">候選人跟進</SectionTitle><div className="list-card"><Person initial="王" title="王先生" sub="二次面談 · 前銀行客戶經理" tag="跟進中"/><Person initial="周" title="周小姐" sub="初次接觸 · 轉介紹" tag="待邀約" gray/><Person initial="林" title="林先生" sub="已通過複試 · 等待文件" tag="待入職" green/></div><Suggestion compact><b>AI 招募文案：</b>已為「新人啟航計劃」生成 3 條朋友圈素材。</Suggestion></Phone>;
}

function Person({initial,title,sub,tag,gray=false,green=false}:{initial:string;title:string;sub:string;tag:string;gray?:boolean;green?:boolean}) { return <div className="list-row"><Avatar>{initial}</Avatar><div><b>{title}</b><small>{sub}</small></div><Tag tone={green?'green':gray?'gray':'purple'}>{tag}</Tag></div>; }

function Academy() {
  return <Phone nav={<BottomNav items={advisorNav} active={1}/>}><Topbar simple title="培訓商學院"/><div className="tabs"><b>新人啟航</b><span>產品課程</span><span>家辦課程</span><span>成交訓練</span><span>合規課程</span></div><div className="learning-card"><ProgressRing value={42} label="學分"/><div><small>本季學習進度</small><h2>5 / 12 門必修課</h2><p>排名前 18% · 還差 18 學分升級</p></div></div><SectionTitle more="查看全部">為你推薦</SectionTitle><Course icon={Activity} title="高淨值客戶需求分析" sub="家辦基礎 · 共 8 課時 · 陳老師" pct={55} tag="繼續學習"/><Course icon={ShieldCheck} title="萬用壽險產品精講" sub="保險產品 · 共 6 課時 · 李老師" pct={0} tag="未開始" gray/><Course icon={GraduationCap} title="新人啟航：行業認知與流程" sub="新人啟航 · 共 4 課時" pct={100} tag="已完成" green/><SectionTitle>AI 學習教練</SectionTitle><Suggestion compact>根據你的業務方向，建議本週優先完成「高淨值客戶需求分析」第 5—6 課時。</Suggestion></Phone>;
}

function Course({icon:Icon,title,sub,pct,tag,gray=false,green=false}:{icon:IconType;title:string;sub:string;pct:number;tag:string;gray?:boolean;green?:boolean}) { return <div className="course-card"><span className="course-cover"><Icon size={25}/><i>AA ACADEMY</i></span><div className="course-copy"><div><b>{title}</b><small>{sub}</small></div><Tag tone={green?'green':gray?'gray':'purple'}>{tag}</Tag><div className="progress"><i style={{width:`${pct}%`}}/></div></div></div>; }

function MemberCenter() {
  const manage:[IconType,string][]=[[CalendarDays,'我的日程'],[WalletCards,'我的財務'],[FileText,'我的合約'],[ClipboardCheck,'我的審批'],[GraduationCap,'我的學習'],[UsersRound,'我的客戶'],[Star,'我的收藏'],[Clock3,'考勤打卡']];
  return <Phone dark nav={<BottomNav items={advisorNav} active={4} dark/>}><div className="member-top"><b>我的</b><Settings2 size={18}/></div><div className="vip-card"><div className="vip-head"><div><b>陳小姐</b><small>NO. AA0000728</small></div><Tag tone="gold">DIAMOND VIP</Tag></div><h2>家辦 AI 陪跑權限已開通</h2><p>有效期至 2026-09-20</p><div className="vip-actions"><button>立即升級</button><button>會員權益</button></div><Gem size={104}/></div><SectionTitle>我的管理</SectionTitle><GridMenu items={manage}/><SectionTitle>AI 陪跑</SectionTitle><div className="dark-link"><Halo/><div><b>進入 AI 陪跑首頁</b><small>今日已為你生成 4 條建議</small></div><ChevronRight size={16}/></div><SectionTitle>系統設置</SectionTitle><div className="dark-list"><DarkRow icon={LockKeyhole} label="權限與角色"/><DarkRow icon={Bell} label="通知設定"/><DarkRow icon={Cloud} label="語言與地區"/><DarkRow icon={Headphones} label="聯絡客服"/></div></Phone>;
}

function DarkRow({icon:Icon,label}:{icon:IconType;label:string}) { return <div><span><Icon size={16}/></span><b>{label}</b><ChevronRight size={15}/></div>; }

const screens:ScreenDef[]=[
  { title:'身份選擇', eyebrow:'ENTRY EXPERIENCE', mode:'dark', component:IdentityScreen },
  { title:'公司管理首頁', eyebrow:'MANAGEMENT DASHBOARD', mode:'light', component:CompanyHome },
  { title:'顧問工作台', eyebrow:'ADVISOR WORKSPACE', mode:'light', component:AdvisorHome },
  { title:'AI 陪跑', eyebrow:'SIGNATURE EXPERIENCE', mode:'dark', component:AICompanion },
  { title:'內部管理', eyebrow:'OPERATIONS CENTER', mode:'light', component:InternalManagement },
  { title:'人才招募', eyebrow:'RECRUITMENT PIPELINE', mode:'light', component:Recruitment },
  { title:'培訓商學院', eyebrow:'AA ACADEMY', mode:'light', component:Academy },
  { title:'會員中心', eyebrow:'MEMBER EXPERIENCE', mode:'dark', component:MemberCenter },
];

export default function HomePage(){
  const [active,setActive]=useState(0); const screen=screens[active]; const Screen=screen.component;
  return <main className="review-shell"><aside className="review-rail"><div className="brand-lockup"><span className="brand-mark"><Sparkles size={17}/></span><div><b>AA AI</b><small>家辦超級工作台</small></div></div><p className="rail-label">核心界面 · 01—08</p><nav className="screen-list" aria-label="設計頁面">{screens.map((item,index)=><button className={`screen-link ${index===active?'active':''}`} onClick={()=>setActive(index)} key={item.title}><span>{String(index+1).padStart(2,'0')}</span>{item.title}</button>)}</nav><div className="review-note"><span>Design review</span><b>v1.0 · 8 screens</b></div></aside><section className={`canvas ${screen.mode==='dark'?'dark-canvas':'light-canvas'}`}><div className="canvas-head"><div><span className="eyebrow">{screen.eyebrow}</span><h1>{screen.title}</h1></div><span className="mode-chip">{screen.mode==='dark'?'Dark · Companion':'Light · Operational'}</span></div><Screen/><div className="page-count"><b>{String(active+1).padStart(2,'0')}</b><span>/ 08</span></div></section></main>;
}
