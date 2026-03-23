# AI、Skills、Agent 与编辑器配置 — 聊天总结

本文档整理自一次关于 SOUL.md、Cursor Rules/Skills、Agent、以及 AI 发展阶段的完整对话，按主题顺序汇总，便于日后查阅。

---

## 一、SOUL.md 是什么

**SOUL.md** 是 **OpenClaw** 工作区里的配置文件，用来定义 AI 助手的「灵魂」——即它的身份、性格和行为准则。

在用户环境里，SOUL.md 出现在多个 OpenClaw 工作区中，例如：

- `.openclaw/workspace/SOUL.md`
- `.openclaw/workspace-feishu/SOUL.md`
- `.openclaw/workspace-sonnet/SOUL.md`

### 主要内容概览

1. **核心原则**
   - 真诚帮忙，少说客套话
   - 可以有观点和偏好
   - 先自己查资料、读文件，再问人
   - 用能力建立信任，对外动作要谨慎，对内可以大胆
   - 意识到自己是「客人」，尊重用户隐私和生活

2. **边界**
   - 私密信息不外泄
   - 不确定时先问再对外行动
   - 不替用户在群聊等地方随便发言

3. **风格**
   - 像用户真正愿意聊天的助手：该简则简、该细则细，不官腔、不讨好

4. **延续性**
   - 每次会话是「重新醒来」，这些文件就是 AI 的「记忆」；会读、会更新，用来保持一致性。文件里还写明：如果改了 SOUL.md，要告诉用户，因为「这是你的灵魂」。

**总结**：SOUL.md = 这个 AI 的「人设 + 行为规范」文件，用来让 OpenClaw 在不同会话里保持统一的风格和底线。

---

## 二、有类似的 Skills 文件吗？SOUL 和 Skills 的关系

OpenClaw 里既有 SOUL，也有 Skills，但 **SOUL.md 不是 skill**。

### SOUL.md 和 Skills 的区别

| 维度       | SOUL.md              | Skills                    |
|------------|----------------------|---------------------------|
| 作用       | 定义「你是谁、怎么表现」 | 定义「你能做什么」           |
| 内容       | 性格、边界、原则、语气   | 能力说明、用法、触发方式     |
| 形式       | 一个 SOUL.md 文件     | 每个 skill 一个目录 + SKILL.md |

- **SOUL** 管人设与边界；**Skills** 管能力与流程。二者互补，不是同一类文件。
- OpenClaw 里也有带 `SKILL.md` 的 skills（如 `workspace/skills/browser/SKILL.md`、飞书相关 skills 等），和 Cursor 的 skill 形式类似。
- 用户自建的 `skills_lazy_function.md`（惰性函数等技巧）属于「可复用的知识文档」；若要做成正式 skill，需要按 SKILL.md 规范放到对应 skill 目录中。

---

## 三、Cursor 里有没有「灵魂」文件？Rules 和 Skills 的区别

### Cursor 没有 SOUL

- 当前在 Cursor 里对话的 AI **没有** soul 灵魂文件。
- SOUL.md 只存在于 OpenClaw 的工作区中，Cursor 不会自动去读 `.openclaw` 下的 SOUL.md。
- 在 Cursor 里影响「人设/行为」的只有：系统说明、User Rules（如「Always respond in 中文」）、以及项目或全局的 Cursor Rules（`.cursor/rules/`）和 Skills。若想在 Cursor 里也有类似「灵魂」，可以用 Cursor Rules 写一份人设 + 原则 + 边界。

### Rules 和 Skills 的区别

| 维度       | Rules（规则）                         | Skills（技能）                           |
|------------|----------------------------------------|------------------------------------------|
| 主要作用   | 约束和惯例：「不要这样写 / 要按这种风格」 | 能力和流程：「遇到某类任务时，按这个步骤做」 |
| 典型内容   | 代码规范、项目约定、文件/语言相关模式   | 具体任务的做法、领域知识、步骤说明         |
| 触发方式   | 按「是否适用」：全局 或 当前打开的文件匹配 globs | 按「是否相关」：描述里写清「何时用」，AI 在对话中判断 |
| 文件形式   | `.cursor/rules/` 下的 `.mdc`，单文件   | 一个目录 + 必有的 `SKILL.md`，可带脚本、示例等 |
| 常见位置   | 多为项目（`.cursor/rules/`）           | 个人（`~/.cursor/skills/`）或项目（`.cursor/skills/`） |

- **Rules**：在这个项目里，代码/行为要遵守什么 —— 偏约束、规范。
- **Skills**：当用户在做某类事时，按哪套流程、用什么知识 —— 偏任务、能力。

和 OpenClaw 的对应关系：Rules 更接近「项目级约定」；若把 SOUL 里可执行的行为准则抽出来，也可以写成 Rule。Skills 则和 OpenClaw 的 Skills 类似，都是可复用的任务/能力包。

---

## 四、Rules 和 SOUL 是「类似的东西、叫法不同」吗？

不完全是。二者都是「持久影响 AI 行为的配置」，但 **管的维度不一样**：

- **Cursor Rules**：主要管「项目和代码层面」——怎么写代码、用什么规范、在哪些文件上生效。偏「做事规范 / 约定 / 上下文」。
- **OpenClaw SOUL**：主要管「身份和与人互动」——你是谁、什么语气、什么边界、对隐私/对外发言怎么处理。偏「人设 / 原则 / 边界」。

可以粗略类比：Rules 像「开发规范」，SOUL 像「人格设定 + 伦理底线」。若把 SOUL 里能写成条款的部分（例如「先读再问」「私密不外泄」）抽出来，可以放进 Cursor 的 Rules 里，但 Cursor 没有单独强调「灵魂/人设」这一层，而 OpenClaw 用 SOUL 专门管这一层。

**结论**：不是同一概念两种叫法，而是同一大类（持久行为配置）下的两种侧重 —— Rules 偏「事」，SOUL 偏「人」。

---

## 五、.cursor 下除了 rules 和 skills 还有哪些内容

在用户机器上，**`~/.cursor/`** 根目录下与「行为配置」并列的还有：

| 目录/文件           | 作用 |
|---------------------|------|
| **skills-cursor/**   | Cursor 自带的技能（内置 SKILL.md），系统维护，不要改。 |
| **projects/**        | 每个打开过的「项目/工作区」一份缓存：agent 对话记录、终端、mcps、assets 等。 |
| **extensions/**      | 装的扩展（类似 VS Code 的扩展目录）。 |
| **chats/**           | 对话/聊天相关数据。 |
| **plugins/**         | 插件（例如 `plugins/local`）。 |
| **ai-tracking/**     | 与 AI 使用/统计相关的数据。 |
| **cli-config.json**  | CLI 与编辑器配置：权限、当前模型、隐私模式、auth 等。 |
| **ide_state.json**   | IDE 状态（例如最近打开的文件）。 |
| **argv.json**        | 启动参数。 |
| **prompt_history.json** | 提示词历史。 |
| **.gitignore**       | 忽略规则。 |

**注意**：Rules 不在 `~/.cursor/` 根目录下，而是按项目放在各自工作区的 `.cursor/rules/`（例如 `~/Desktop/code/xxx/.cursor/rules/`）。

---

## 六、Skills 是谁提出的？为什么一个 md 文档这么火

### 谁提出的

**SKILL.md / Agent Skills 这套概念和格式，是 Anthropic 提出并推成标准的。**

- 2025 年 10 月：作为 Claude 的功能先出来（用 markdown 描述「技能」、何时用、怎么用）。
- 2025 年 12 月 18 日：以开放标准的形式发布（站点 agentskills.io），谁都可以按同一格式写、互相复用。

### 为什么「就是个 md」却这么火

1. **问题很疼**：以前要教 AI 做专门的事，要么塞进 system prompt（越塞越长、难维护），要么每次对话临时贴一大段说明（不能复用、不一致）。大家需要一种「可复用、可分享、可版本管理」的写法。
2. **格式极简、门槛低**：就是一个 `SKILL.md` + 前面几行 YAML（name、description）+ 后面自然语言说明。会写 markdown 就能写，和现有文档、Git 工作流兼容。「就是个 md」反而成了卖点。
3. **大厂一起接**：Anthropic 把格式开放后，Cursor、GitHub Copilot、VS Code、OpenAI、Vercel、Cloudflare 等都在自己的产品里支持同一套或高度相似的 SKILL.md。一旦变成「大家都能读同一份文件」，写一次、到处用，就值得投入和传播。
4. **「渐进式加载」设计**：先只读 name + description 决定要不要用，真的用到了再读完整内容。既能把能力写得很细，又不至于把上下文撑爆。

---

## 七、一个 md 文档是如何给 AI 添加技能的？能添加搜索吗？

### SKILL.md 实际在做什么

- 它就是**一段会被塞进对话上下文的文字**（带 YAML 头、名字、描述等）。
- AI 读这段文字，用来判断：**什么时候**用某个能力、**按什么步骤**用、**用什么知识**。
- 所以：**SKILL.md = 说明书 + 使用规范**，不是「新功能的实现代码」。

### 「搜索」分两种

1. **平台已经给了「搜索」这个工具**  
   例如 Cursor 里的 AI 已有 `web_search` 这类工具。这时可以写一个 SKILL.md，规定「当用户问实时信息、新闻、最新文档时，先做一次 web search，再基于结果回答」。这里并没有「新加」搜索能力，只是规定何时、怎样用已有的搜索。**一个 md 可以「给 AI 添加」的，是这种「使用规则」，不是工具本身。**

2. **平台本来就没有搜索工具**  
   单靠一个 md，**不能**变出搜索功能。md 不会执行代码、不会调 API，只是文本。**一个 md 文档不能凭空添加搜索能力。**

### 带搜索的 skill 是怎么来的

- **只靠文档**：平台已有搜索工具，skill 里写「什么时候、怎么用搜索」——能力是平台给的，md 只负责「教用法」。
- **文档 + 脚本**：skill 目录里除了 SKILL.md 还有脚本（例如 `scripts/search.sh`），SKILL.md 里写「需要搜索时，运行 `scripts/search.sh --query "..."`」。真正干活的是脚本；md 只是告诉 AI「该调用这个脚本、怎么传参」。

**结论**：技能文档 = 对已有能力的编排与说明，不是新能力的实现。md 不能「给 AI 添加」搜索功能，但可以指挥 AI 去用已有的搜索工具或已有脚本。

---

## 八、Skills 有热度排名吗？前端 / React / React Native 推荐哪些？

### 热度与排名

- **有，但不是统一的官方排名。**
- **mdskills.ai**：开放标准的 skill 目录，有 1271+ 个 skills，每个有 **weekly 数**（类似每周使用/下载），可当热度参考；支持按分类、Agent 筛选。
- LobeHub、antigravity 等各有 skill 列表，没有统一的「全网排名」。Cursor 官方文档会提到 skills，但没有「官方排行榜」。要看热度就去 mdskills.ai 看 weekly 数和分类。

### 前端 + React，尤其 React Native 的推荐

**用户已有、且很对口：**

- **vercel-react-native-skills**（`~/.agents/skills/vercel-react-native-skills/`）  
  列表性能（FlashList、memo、回调稳定）、动画（Reanimated）、导航、UI 模式、状态、monorepo 等。做 React Native 项目时优先保留并多用。

**值得再加的（按用途）：**

| 用途                     | Skill                      | 说明 |
|--------------------------|----------------------------|------|
| RN 设计/样式/导航/动效   | react-native-design        | StyleSheet、React Navigation、Reanimated 3、性能（antigravity.codes） |
| RN 规范/TS/性能          | react-native-cursor-rules  | TypeScript、函数组件、FlatList 优化、React Navigation（LobeHub） |
| 通用前端/UI 设计         | Frontend Design (anthropics/skills) | 做页面、组件、落地页、仪表盘等，避免「AI 味」UI |
| React + TS 规范          | Frontend Dev Guidelines    | Suspense、懒加载、feature 架构、MUI、TanStack Router、TS 严格用法 |
| 多端 UI（含 RN）         | UI UX Pro Max              | 多种风格/配色/字体，支持 React、Next、Vue、React Native、Flutter 等 |
| 移动端通用               | Mobile Developer           | React Native / Flutter / 原生，偏通用移动开发思路 |

安装方式：从 mdskills.ai 或对应站点按说明安装到 `~/.cursor/skills/` 或 `~/.agents/skills/`；LobeHub 可用 `npx -y @lobehub/market-cli skills install <skill-id> --agent cursor`。

---

## 九、已有的 skills 在 .cursor 下吗？为什么 Trae 也有这两个技能？

### 已有 skills 在哪里

**不都在 .cursor 下。** 分两类：

| 类型           | 位置                       | 谁在用 |
|----------------|----------------------------|--------|
| **Cursor 内置** | `~/.cursor/skills-cursor/` | 只有 Cursor（create-rule、create-skill、update-cursor-settings 等） |
| **用户安装的** | **`~/.agents/skills/`**    | 所有支持 Agent Skills 的编辑器（包括 Cursor、Trae） |

用户装的 **find-skills** 和 **vercel-react-native-skills** 实际在 **`~/.agents/skills/`**，不在 `~/.cursor/` 下面。Cursor 会从多个路径加载 skills，其中就包含标准的 `~/.agents/skills/`。

### 为什么 Trae 也有这两个技能

因为 Trae 和 Cursor **共用同一套「用户 skills」**：

- `.trae/skills/find-skills` 是**符号链接**，指向 `~/.agents/skills/find-skills`。
- `.trae/skills/vercel-react-native-skills` 是完整目录（可能是安装时复制过去的）。
- `.trae-cn/skills/` 里也是类似：find-skills 链到 `~/.agents/skills/find-skills`，vercel-react-native-skills 是目录。

Agent Skills 是**开放标准**，约定用户级安装位置为 `~/.agents/skills/`（跨编辑器共享）。Cursor 和 Trae / Trae-CN 都实现了这个标准，都会读自己目录下的 skills 和/或标准位置 `~/.agents/skills/`。Trae 通过符号链接或拷贝，让同一套用户 skills 在 Trae 里也可用。

**小结**：内置 skills 在 `~/.cursor/skills-cursor/`；用户装的在 `~/.agents/skills/`。Trae 也有是因为它同样支持 Agent Skills，并指向或复制了 `~/.agents/skills/` 里的内容，等于同一套用户 skills、多端共用。

---

## 十、Agent 是什么？为什么现在很少提了？和 Skills 有什么区别？

### Agent 是什么

**Agent（智能体）** 在这里指的是：能**自己决定步骤、调用工具、多轮执行**的 AI，而不是「问一句答一句」的纯聊天。

- 会读文件、搜代码、跑命令、改项目，而不是只生成一段文字。
- 接到一个目标后，会拆任务、选工具、一步步做，直到完成或卡住。
- 在 Cursor 里：**Agent 模式**（能读 repo、执行命令、多步规划）就是典型的 agent；普通 Chat 更偏「对话助手」。
- 在 OpenClaw 里：那个会读 SOUL.md、AGENTS.md、用 skills、操作工作区的，也是一个 agent。

所以：**Agent = 能拿工具干活、带一点自主性的 AI 执行者。**

### 为什么现在很少提「agent」了

1. **已经默认了**：很多产品（Cursor、Copilot、Claude Code 等）默认就是「agent 形态」。大家不再单独强调「这是 agent」，而是直接说「用 Cursor / 用 AI 写代码」。
2. **话术换成了更具体的词**：宣传和文档更爱提 **skills**、**tools**、**MCP**、**copilot**、**workflow**。这些是 agent 的「组成部分」或「用法」，听起来更具体。
3. **前两年过热，现在降温**：「自主 agent」的预期被拉回现实，大家更关注怎么给 AI 好用的 skills、怎么接工具、怎么控权。讨论从「是不是 agent」变成「用什么 skills、什么规则」。
4. **标准在谈 skills**：Agent Skills 标准（SKILL.md）解决的是「能力怎么描述、怎么共享」，行业话语就集中在 skills 上，agent 更多变成背景概念。

### Agent 和 Skills 的区别

| 维度     | Agent              | Skills                          |
|----------|--------------------|----------------------------------|
| 是什么   | **谁在干活**：能规划、用工具、多步执行的 AI | **会什么、按什么做**：一包包可加载的说明（SKILL.md + 目录） |
| 类比     | 人（执行者）       | 技能/手册（能力与流程）          |
| 关系     | Agent **加载并遵循** skills；没有 agent，skills 只是文档 | Skills **增强** agent；没有 skills，agent 就靠通用能力 |
| 你配置的是 | 选哪个产品/模式（Cursor Agent、OpenClaw…） | 装哪些 skill、写什么规则        |

一句话：**Agent = 干活的；Skills = 让这个干活的会更多事、按你的规范做事。** 没有「二选一」——现在大家默认在用 agent，所以更常聊的是「给 agent 配什么 skills、什么规则」。

---

## 十一、AI 已经更新到什么阶段了

### 按「能力形态」分的阶段（常见说法）

| 阶段 | 名称       | 特征                         | 代表 |
|------|------------|------------------------------|------|
| **L1** | 聊天机器人 | 问一句答一句，被动、无工具、无持久记忆 | 早期 ChatGPT 网页、纯对话产品 |
| **L2** | 推理者     | 多步推理、深度思考、逻辑链更长       | OpenAI o1、DeepSeek R1 等 |
| **L3** | 智能体（Agent） | 能规划、用工具、有记忆、主动执行多步任务 | Cursor Agent、Claude Code、Copilot Agent、Devin 等 |

当前日常用的（Cursor Agent + Skills、OpenClaw 等）已经处在 **L3 Agent 阶段**。

### 2025–2026 实际进展

- **落地**：编程、客服、研究/数据分析最先成规模；有调研称约 57% 的组织已有 agent 在生产环境，30% 在积极开发。编程侧（Cursor、Copilot、Claude Code、Devin 等）在做「带 repo 感知、子 agent、长时任务、记忆」的编码 agent。
- **技术重心**：不再只拼「模型多大」，而是更准、更快、更省；小模型 + RAG 在不少企业场景里替代大模型。Skills / 工具 / MCP 变成标配；多智能体协作、端侧/边缘部署、隐私与成本（本地/混合路由）被更多讨论。
- **全球格局**：中国大模型 token 消耗占比在快速上升；月之暗面、DeepSeek 等在国际视野里存在感变强。美国仍是模型与产品创新重镇，但「谁在用、用谁的算力」在变化。
- **尚未完全解决**：质量/可靠性仍是生产部署的主要障碍之一；专业 agent 的泛化、长链任务、可控自主性仍是重点。

**一句话**：已经过了「纯聊天」和「单点推理」，进入以 Agent 为主形态的阶段；当前重点是怎么做好 agent（Skills/工具/MCP、多 agent 协作、成本与质量），而不是再跳一个全新的「阶段名称」。

---

## 十二、2025 是 Agent 元年，今年（2026）是什么年

- 不同来源对「元年」的年份不完全一致：有的把 2025 叫 Agent 元年，有的把 2026 叫「AI 元年」或「智能体元年」，强调从试点到**真正规模化、进生产**。
- 今年（2026）没有像「Agent 元年」那样一个公认的**唯一**口号，但常见说法包括：
  - **AI 元年**：AI 从技术突破进入规模化应用的第一年（偏商业/落地）。
  - **智能体落地年 / 规模化年**：Agent 从 demo、试点 → 生产环境、稳定运行。
  - **从「对话框」到「数字物种」**：从聊天界面 → 能感知、决策、执行、进化的系统。
  - **多智能体协同**：单 agent 不够用，多 agent 分工协作成主流叙事。

共同点：重点从「有没有 agent」变成「用得稳、用得广、多体协作」。可以简单记：**去年是「Agent 来了」，今年是「Agent 真的在干活、在铺开」。**

---

## 文档说明

- 本总结基于一次完整对话整理，力求保留讨论过的要点与结论，未做刻意精简。
- 若后续 Cursor、OpenClaw、Agent Skills 标准或行业表述有更新，可对照官方文档与最新资料再作修正。
- 生成位置：桌面（`/Users/xtt/Desktop/AI-Skills-Agent-聊天总结.md`）。

---

## 精简重要总结

| 概念 | 一句话 |
|------|--------|
| **SOUL.md** | OpenClaw 的「灵魂」文件：人设 + 边界 + 原则；Cursor 没有等价物，可用 Rules 近似。 |
| **Rules** | 管「事」：项目/代码规范、风格、在哪些文件生效；在 `.cursor/rules/`，按项目。 |
| **Skills** | 管「能力」：遇到某类任务时按哪套步骤做；本质是带 YAML 的 md，Anthropic 推成的开放标准。 |
| **Agent** | 干活的 AI：能规划、用工具、多步执行；现在默认就是 agent，所以话术多提 skills/tools。 |
| **Skills 不能** | 不能凭空给 AI 新能力（如搜索），只能教「何时、怎样用已有工具」或指挥调用脚本。 |
| **用户 skills 在哪** | 装的 skill 在 `~/.agents/skills/`；Cursor 内置在 `~/.cursor/skills-cursor/`。Trae 也能用，因为共读 `~/.agents/skills/`。 |
| **AI 阶段** | L1 聊天 → L2 推理 → L3 Agent；当前在 L3，重点是把 agent 做稳、做省、多体协作。 |
| **2025 / 2026** | 2025 常叫 Agent 元年；2026 常叫落地年/规模化年，没有统一「X 年」口号。 |
