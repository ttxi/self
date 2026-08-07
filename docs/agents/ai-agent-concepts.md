# AI Agent 概念地图

> Agent 是一个能围绕目标，自己决定下一步，并通过工具影响外部世界的 AI 系统。

普通聊天模型主要是“你问一句，它答一句”；Agent 更像一个执行者，会循环进行：

```text
理解目标 → 制定下一步 → 调用工具 → 观察结果 → 调整方案 → 完成或请求人工介入
```

## 1. Agent 的基本组成

| 概念 | 通俗理解 | 具体含义 |
| --- | --- | --- |
| Model | 大脑 | LLM、多模态模型、推理模型 |
| Instructions | 岗位说明书 | System Prompt、业务规则、输出规范 |
| Tools | 手脚 | 搜索、数据库、代码执行、浏览器、API |
| Context | 桌面上的材料 | 用户输入、历史消息、文件、工具结果 |
| Memory | 笔记本和档案库 | 会话状态、用户偏好、历史经验 |
| Environment | 工作场所 | 文件系统、浏览器、沙箱、内部系统 |
| Harness | Agent 外壳 | 循环控制、工具调度、上下文管理、重试 |
| Runtime | 执行系统 | Run、队列、事件、暂停恢复、持久化 |
| Guardrails | 行为边界 | 权限控制、审批、内容检查、预算限制 |

一个模型本身通常不能直接称为完整 Agent。真正的 Agent 是“模型 + 工具 + 状态 + 执行循环 + 安全边界”共同组成的系统。

## 2. Agent Loop

Agent Loop 是 Agent 连续完成任务的核心机制：

1. 接收 Goal：明确要完成的目标。
2. 获取 Context：读取输入、文件和历史状态。
3. Reason / Plan：判断下一步应该做什么。
4. Act：调用工具执行动作。
5. Observe：读取工具执行结果。
6. Update State：记录进度、错误和新发现。
7. 判断继续、结束，还是询问用户。

常见相关术语：

- **ReAct**：Reason + Act，思考一步、行动一步、观察后继续。
- **Plan-and-Execute**：先制定计划，再逐项执行。
- **Reflection / Critic**：生成结果后进行自检或交叉审查。
- **Retry / Recovery**：失败后更换参数、工具或执行路径。
- **Termination Condition**：判断任务何时真正完成。
- **Max Steps / Budget**：限制循环次数、Token、时间和成本。

“能调用一次工具”不一定就是 Agent。关键在于模型是否能根据观察结果动态决定后续步骤。

## 3. LLM、Workflow 与 Agent

| 类型 | 谁决定执行路径 | 示例 |
| --- | --- | --- |
| 普通 LLM 调用 | 应用代码 | 输入文本，返回摘要 |
| RAG | 应用代码 | 固定先检索，再生成回答 |
| Workflow | 预定义流程或 DAG | 分类 → 检索 → 生成 → 审核 |
| Agent | 模型动态决定 | 自己判断搜索、读文件还是询问用户 |
| Agentic Workflow | 固定框架中包含动态决策 | DAG 的部分节点运行 Agent Loop |

固定步骤清楚、稳定性要求高的任务，Workflow 往往更合适；路径无法预先枚举时，Agent 才更有价值。

## 4. 工具相关概念

### Tool / Function Calling

Tool 是 Agent 能够调用的外部能力，例如：

- **Data Tool**：搜索网页、读取文件、查询数据库。
- **Action Tool**：发邮件、修改记录、创建订单。
- **Computation Tool**：执行代码、计算、生成图表。
- **Computer Use**：通过截图、鼠标和键盘操作界面。
- **Agent-as-Tool**：把另一个 Agent 当作工具调用。

模型一般只负责选择工具和生成参数，真正执行工具的是 Agent Runtime。

### MCP

MCP（Model Context Protocol）主要标准化 Agent 如何连接外部工具和数据。

核心对象包括：

- **Tools**：可执行操作。
- **Resources**：可读取的上下文资源。
- **Prompts**：可复用的提示模板。
- **Sampling / Elicitation**：请求模型生成或请求用户提供信息。

可以把 MCP 理解成 Agent 与工具、数据之间的通用插座。MCP 本身不是 Agent，也不负责完整的任务编排。

### Skill

Skill 通常是一个可复用的能力包，可能包含：

- 任务说明和最佳实践；
- Prompt；
- 工具定义；
- 脚本和模板；
- 示例和执行约束。

Tool 更像“锤子”，Skill 更像“使用锤子完成木工任务的操作手册和配套工具箱”。

## 5. Context、RAG 与 Memory

### Context Window

Context 是模型本次推理实际能看到的内容，包括：

- System Prompt；
- 用户消息和历史对话；
- 工具调用及其结果；
- 检索得到的资料；
- 当前计划和任务状态。

上下文容量有限，因此需要 **Context Engineering**：决定什么内容应该进入模型，什么内容应该压缩、外置或丢弃。

### RAG

RAG 是“现查现用”：

```text
用户问题 → 搜索知识库 → 取回相关资料 → 放进上下文 → 生成回答
```

RAG 不等于 Agent，也不天然等于 Memory。Agent 可以把检索作为一个工具动态使用。

### Memory

常见的记忆类型包括：

- **Working Memory**：当前推理需要的临时信息。
- **Short-term / Thread Memory**：一个会话或任务中的状态。
- **Long-term Memory**：跨会话保存的偏好和事实。
- **Episodic Memory**：过去做过哪些任务以及结果如何。
- **Semantic Memory**：抽取出的稳定事实和知识。
- **Procedural Memory**：执行某类任务的方法、规则或 Skill。

工程上需要明确区分：

```text
消息历史 ≠ 工作流状态 ≠ Checkpoint ≠ 长期用户记忆
```

## 6. Runtime 与持久化

生产级 Agent 通常包含以下运行时对象：

- **Agent**：能力和行为配置。
- **Thread / Session**：一段连续交互。
- **Run**：针对某个目标的一次执行。
- **Task**：可独立跟踪的工作单元。
- **Step / Node**：执行中的一步。
- **Message**：用户、Agent 或工具之间的消息。
- **Event**：状态变化或流式输出。
- **Artifact**：文档、代码、图片、数据等任务成果。
- **State**：当前任务的结构化状态。
- **Checkpoint**：某个时间点的状态快照。
- **Trace**：完整执行轨迹。

长任务还会涉及：

- **Durable Execution**：进程重启后仍能恢复。
- **Interrupt / Resume**：暂停等待用户，再从保存状态继续。
- **Streaming**：实时返回文本、工具状态和中间事件。
- **Queue / Worker**：异步排队与后台执行。
- **Retry / Timeout**：失败重试和超时控制。
- **Idempotency**：任务重放时避免重复扣款、发信或创建记录。
- **Cancellation**：取消执行并处理已经发生的副作用。

## 7. Human-in-the-loop

Human-in-the-loop，简称 HITL，表示 Agent 在某些节点暂停并交给人判断。

常见形式包括：

- **Clarification**：信息不足时向用户提问。
- **Approval**：付款、删除、发送等操作前请求批准。
- **Review**：让人审核或修改 Agent 生成的内容。
- **Escalation**：Agent 无法处理时转交人工。
- **Takeover**：用户直接接管后续操作。
- **Interrupt / Resume**：保存状态，收到答复后恢复执行。

好的 Agent 不是永远不问人，而是知道什么时候应该自己继续，什么时候必须停下来。

## 8. 单 Agent 与多 Agent

### Single Agent

一个 Agent 拥有多种工具，自己完成整个任务。通常应该优先从单 Agent 开始，因为它的状态和调试更简单。

### Multi-Agent

多 Agent 将能力拆分给多个相对独立的执行者。常见结构包括：

- **Manager–Worker**：管理 Agent 分解任务并分派给专业 Agent。
- **Supervisor**：监督者决定哪个 Agent 下一步行动。
- **Handoff**：当前 Agent 把控制权移交给另一个 Agent。
- **Router**：根据请求类型选择合适的 Agent。
- **Parallel Workers**：多个 Agent 并行调查，再统一汇总。
- **Debate / Critic**：多个 Agent 提案、批判和裁决。
- **Swarm**：相对去中心化的 Agent 协作。

多 Agent 不等于多个模型，也不一定比单 Agent 更聪明。它主要解决专业分工、上下文隔离、权限隔离和并发问题，但会增加通信成本、状态一致性和错误归因难度。

## 9. Agent 之间的通信：A2A

A2A（Agent2Agent Protocol）主要解决独立 Agent 系统之间的发现、通信和任务协作。

核心概念包括：

- **Agent Card**：描述 Agent 能力、接口和认证要求的电子名片。
- **Message**：双方交换的消息。
- **Task**：具有 ID 和生命周期的工作单元。
- **Artifact**：Agent 生成的成果。
- **Part**：文本、文件、结构化数据等最小内容单元。
- **Streaming**：实时传递任务状态和增量结果。
- **Context**：关联多个任务和消息。

可以粗略理解为：

```text
MCP：Agent ↔ 工具和数据
A2A：Agent ↔ Agent
```

## 10. 安全与治理

Agent 能够修改外部世界，因此安全边界非常重要：

- **Authentication**：确认调用者是谁。
- **Authorization**：规定调用者能够做什么。
- **Least Privilege**：只授予任务必需的最小权限。
- **Sandbox**：在隔离环境中运行代码和文件操作。
- **Guardrails**：对输入、输出和工具调用进行检查。
- **Prompt Injection**：外部内容诱导 Agent 违背原始目标。
- **Tool Poisoning**：恶意工具描述或工具返回结果。
- **Confirmation Gate**：高风险操作前必须确认。
- **Audit Log / Trace**：记录 Agent 看过和执行过的内容。
- **Secret Management**：避免密钥直接进入模型上下文。
- **Budget / Rate Limit**：限制成本、次数和运行时间。

Guardrail 不能替代真正的权限控制。“Prompt 里写不要删除数据库”远不如数据库账号本身没有删除权限可靠。

## 11. 评测与可观测性

Agent 的评测不能只看最后一句回答，还要检查完整执行过程：

- **Task Success**：目标是否完成。
- **Correctness**：结果是否正确。
- **Tool Selection**：工具是否选对。
- **Argument Accuracy**：工具参数是否正确。
- **Trajectory**：执行路径是否合理。
- **Side Effects**：是否产生错误或重复操作。
- **Groundedness**：结论能否被资料支持。
- **Cost / Latency**：消耗了多少 Token、时间和调用成本。
- **Recovery Rate**：遇到错误后能否恢复。
- **Human Intervention Rate**：多少任务需要人工接管。
- **Safety Violations**：是否越权或泄露信息。

常见配套概念：

- **Trace**：一次任务的完整执行链路。
- **Span**：其中一次模型或工具调用。
- **Offline Eval**：使用固定数据集进行回归测试。
- **Online Eval**：对真实线上任务进行抽样评估。
- **LLM-as-Judge**：让模型评分，但需要进行校准。
- **Deterministic Check**：使用代码、测试或数据库状态验证结果。

## 12. 常见 Agent 产品形态

- **Coding Agent**：读写代码、运行测试、修复问题。
- **Browser Agent**：浏览网页、填写表单、提取信息。
- **Deep Research Agent**：多轮检索、阅读和交叉验证。
- **Data Agent**：查询数据库、编写 SQL、分析和制图。
- **Customer Support Agent**：处理工单、调用业务系统、转人工。
- **Voice Agent**：结合语音识别、实时模型和语音合成。
- **Computer-use Agent**：直接操作桌面或网页 GUI。
- **Embodied Agent**：机器人、自动驾驶等物理执行体。
- **Background Agent**：在后台异步执行长任务。
- **Workspace Agent**：连接企业文档、邮件、日历和业务系统。
- **Self-improving Agent**：根据评测更新 Prompt、Skill、Memory 或工具，通常不意味着模型自动修改自身权重。

## 13. 总体结构

```text
用户目标
   ↓
Agent Harness
   ├── Model：判断和推理
   ├── Instructions：行为说明
   ├── Context：当前可见信息
   ├── Memory：短期与长期状态
   ├── Tools：读取和执行操作
   ├── Planner / Orchestrator：决定下一步
   ├── Runtime：Run、事件、队列、Checkpoint
   ├── Guardrails：权限、审批、安全检查
   └── Evals / Tracing：验证效果、定位问题
   ↓
文件、网页、数据库、API、其他 Agent、现实世界
```

## 一句话总结

> LLM 是大脑，Tool 是手脚，Memory 是笔记，Runtime 是工作台，Guardrail 是权限边界；它们通过 Agent Loop 围绕目标持续运行，才组成真正的 Agent。

## 参考资料

- [OpenAI：A practical guide to building AI agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
- [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Model Context Protocol：Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture)
- [Agent2Agent Protocol：Specification](https://a2aproject.github.io/A2A/latest/specification/)
- [LangGraph：Persistence](https://langchain-ai.github.io/langgraph/concepts/time-travel/)
- [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
