import React, {
  useState,
  useMemo,
  useCallback,
  CSSProperties,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";

// --- DATA MẪU CHO TRÒ CHƠI ---
const PROPERTIES = [
  // Thị trường Độc quyền
  {
    id: 1,
    category: "Thị trường Độc quyền",
    group: "Độc quyền Dữ liệu & AI",
    name: "AI Tổng quát (AGI Core)",
    cost: 500,
    income: { usd: 80, data: 10 },
    politics: 3,
    owned: false,
    mortgaged: false,
    rent: 150,
  },
  {
    id: 2,
    category: "Thị trường Độc quyền",
    group: "Độc quyền Dữ liệu & AI",
    name: "Hệ thống Dữ liệu Lớn (Big Data Hub)",
    cost: 450,
    income: { usd: 70, data: 8 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: 120,
  },
  {
    id: 3,
    category: "Thị trường Độc quyền",
    group: "Tài chính Số & Thương mại",
    name: "Cổng Thanh toán Toàn cầu (Global Pay)",
    cost: 450,
    income: { usd: 90, data: 5 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: 130,
  },
  {
    id: 4,
    category: "Thị trường Độc quyền",
    group: "Tài chính Số & Thương mại",
    name: "Nền tảng E-Commerce Chi phối",
    cost: 400,
    income: { usd: 75, data: 4 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: 140,
  },
  {
    id: 5,
    category: "Thị trường Độc quyền",
    group: "Hạ tầng Vật chất & Logictics",
    name: "Mạng lưới Logictics Tự động (Robotics Log)",
    cost: 400,
    income: { usd: 65, data: 5 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: 100,
  },
  {
    id: 6,
    category: "Thị trường Độc quyền",
    group: "Tài nguyên & Năng lượng",
    name: "Năng lượng Tái tạo Quy mô Lớn",
    cost: 400,
    income: { usd: 70, data: 5 },
    politics: 3,
    owned: false,
    mortgaged: false,
    rent: 90,
  },
  {
    id: 7,
    category: "Thị trường Độc quyền",
    group: "Y tế & Sinh học",
    name: "Công nghệ Sinh học Cá nhân (Genomics)",
    cost: 450,
    income: { usd: 75, data: 7 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: 100,
  },
  {
    id: 8,
    category: "Thị trường Độc quyền",
    group: "Y tế & Sinh học",
    name: "Hồ sơ Y tế Điện tử Toàn cầu (Global EHR)",
    cost: 400,
    income: { usd: 65, data: 6 },
    politics: 3,
    owned: false,
    mortgaged: false,
    rent: 110,
  },
  // Hạ tầng & Mạng lưới
  {
    id: 9,
    category: "Hạ tầng & Mạng lưới",
    group: "Mạng lưới Toàn cầu & Truy cập",
    name: "Mạng lưới 5G/6G Toàn cầu",
    cost: 300,
    income: { usd: 40, data: 8 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: { usd: 60, data: 7 },
  },
  {
    id: 10,
    category: "Hạ tầng & Mạng lưới",
    group: "Mạng lưới Toàn cầu & Truy cập",
    name: "Cáp quang Biển & Đường truyền (Global Cables)",
    cost: 250,
    income: { usd: 30, data: 6 },
    politics: 1,
    owned: false,
    mortgaged: false,
    rent: { usd: 30, data: 6 },
  },
  {
    id: 11,
    category: "Hạ tầng & Mạng lưới",
    group: "Mạng lưới Toàn cầu & Truy cập",
    name: "Nền tảng Mạng xã hội/Truyền thông",
    cost: 350,
    income: { usd: 50, data: 10 },
    politics: 3,
    owned: false,
    mortgaged: false,
    rent: { usd: 50, data: 10 },
  },
  {
    id: 12,
    category: "Hạ tầng & Mạng lưới",
    group: "Mạng lưới Toàn cầu & Truy cập",
    name: "Hệ thống Vệ tinh & Không gian mạng (Satellite Internet)",
    cost: 300,
    income: { usd: 45, data: 7 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: { usd: 45, data: 7 },
  },
  {
    id: 13,
    category: "Hạ tầng & Mạng lưới",
    group: "Nền tảng Số & Bảo mật",
    name: "Hệ thống Quản lý Danh tính Số (Digital ID)",
    cost: 350,
    income: { usd: 40, data: 8 },
    politics: 3,
    owned: false,
    mortgaged: false,
    rent: { usd: 40, data: 8 },
  },
  {
    id: 14,
    category: "Hạ tầng & Mạng lưới",
    group: "Nền tảng Số & Bảo mật",
    name: "Tường lửa Toàn diện/Bảo mật Mạng (Global Firewall)",
    cost: 300,
    income: { usd: 35, data: 6 },
    politics: 2,
    owned: false,
    mortgaged: false,
    rent: { usd: 50, data: 8 },
  },
];

const INFRASTRUCTURE_BONUSES = [
  {
    name: "Mạng lưới 5G/6G Toàn cầu",
    bonus: "Tăng tốc Độ độc quyền",
    effect:
      "Chi phí mua bất kỳ Ô Thị trường Độc quyền Dữ liệu & AI (Nhóm I) nào sẽ giảm 10%.",
    reasoning:
      "Kiểm soát hạ tầng truyền dẫn giúp mở rộng chi phối các lĩnh vực liên quan dễ dàng hơn (lợi thế chi phí).",
  },
  {
    name: "Cáp quang Biển & Đường truyền",
    bonus: "Tăng cường Xuất khẩu Tư bản",
    effect:
      "Thu nhập DATA từ tất cả các ô Thị trường Độc quyền khác tăng thêm 1 DATA/lượt.",
    reasoning:
      "Đảm bảo đường truyền tải dữ liệu toàn cầu ổn định, tối đa hóa việc khai thác tài nguyên dữ liệu.",
  },
  {
    name: "Nền tảng Mạng xã hội/Truyền thông",
    bonus: "Quyền lực Mềm",
    effect:
      "Tăng 2 Ảnh hưởng Chính trị mỗi vòng (cộng dồn vào điểm POLITICS cố định).",
    reasoning:
      "Khả năng định hướng dư luận, thao túng thông tin, tạo ra quyền lực mềm để can thiệp chính trị.",
  },
  {
    name: "Hệ thống Vệ tinh & Không gian mạng",
    bonus: "Bảo hộ Chiến lược",
    effect:
      "Khi một người chơi khác kích hoạt Ô Khủng hoảng Vĩ mô, người sở hữu ô này chỉ chịu 50% tác động tiêu cực của Khủng hoảng.",
    reasoning:
      "Các tài sản không gian mạng được coi là tài sản chiến lược quốc gia, được bảo vệ tốt hơn trong khủng hoảng.",
  },
  {
    name: "Hệ thống Quản lý Danh tính Số (Digital ID)",
    bonus: "Đàm phán Quy chế",
    effect:
      "Khi rơi vào Ô Chính phủ & Quy chế, được phép tung thêm 1 xúc xắc. Nếu tổng điểm ≥ 10, người chơi được miễn chi phí giao dịch tại ô đó.",
    reasoning:
      "Kiểm soát danh tính người dùng là quyền lực tuyệt đối, giúp tăng cường khả năng vận động hành lang thành công.",
  },
  {
    name: "Tường lửa Toàn diện/Bảo mật Mạng",
    bonus: "Chống Rò rỉ Dữ liệu",
    effect:
      "Khi rút phải Thẻ Khí vận gây mất DATA (ví dụ: Lỗi Bảo mật), chỉ bị mất 25% DATA thay vì 50%.",
    reasoning:
      "Giảm thiểu rủi ro nội bộ của độc quyền dữ liệu, tăng cường tính ổn định.",
  },
];

const FINANCIAL_SQUARES = [
  {
    name: "Ngân hàng Đầu tư Chiến lược (Strategic I-Bank)",
    cost: 350,
    coreFunction: "Vay Nợ Khẩn cấp: Cung cấp USD và DATA cho người chơi.",
    mechanism:
      "Sở hữu: Người chơi có thể mua ô này. Nếu sở hữu, người chơi có thể tự ấn định lãi suất vay (ví dụ: 15% → 12%) cho chính mình. Vay nợ: Nếu không sở hữu, người chơi buộc phải vay theo lãi suất mặc định (15% USD/10% DATA). Lãi suất phải trả mỗi khi qua Ô Bắt đầu (nhận lương).",
    reasoning: "Thống trị của Tư bản Tài chính và cơ chế cấp vốn.",
  },
  {
    name: "Quỹ Đầu tư Mạo hiểm Toàn cầu (Global VC)",
    cost: 300,
    coreFunction:
      "Mua Cầm cố: Cho phép người chơi mua lại các Ô Cầm cố của đối thủ từ Ngân hàng.",
    mechanism:
      "Nếu một Ô Thị trường/Hạ tầng bị cầm cố (50% giá trị mua ban đầu), người chơi sở hữu Ô VC có thể trả 50% đó cộng với 2 điểm Ảnh hưởng Chính trị cho Ngân hàng để mua lại Ô đó. Ô đó ngay lập tức thuộc về người mua mới mà không cần qua đấu giá.",
    reasoning:
      "Sự cạnh tranh và tập trung tư bản thông qua mua lại tài sản đang khủng hoảng.",
  },
  {
    name: "Cơ quan Xếp hạng Tín dụng (Credit Rating Agency)",
    cost: 250,
    coreFunction:
      "Đánh giá Độc quyền: Cho phép người chơi chi tiền để tăng Điểm tín nhiệm của mình.",
    mechanism:
      "Khi sử dụng dịch vụ (chi 100 USD + 10 DATA), người chơi tung 1 xúc xắc. Nếu được 5 hoặc 6, giao dịch thành công và được giảm 1 điểm lãi suất vay ở Ô Ngân hàng Đầu tư, phản ánh sự thành công trong việc tạo dựng lòng tin.",
    reasoning: "Ảnh hưởng của giới đầu sỏ tài chính lên sự ổn định thị trường.",
  },
];

const GOVERNMENT_SQUARES = [
  {
    name: "Vận động Hành lang Cao cấp (High-Level Lobbying)",
    cost: 300,
    coreFunction:
      "Thay đổi Luật chơi/Quy chế: Chi POLITICS để tạo lợi thế tạm thời.",
    mechanism:
      "Khi dừng tại ô này, người chơi có thể chi 3 điểm Ảnh hưởng Chính trị và tung một xúc xắc: Thành công (5-6 điểm): Người chơi được chọn một Lợi thế Tạm thời (ví dụ: miễn thuế 2 vòng). Thất bại (1-4 điểm): Chỉ mất 3 điểm POLITICS. Sở hữu: Giảm chi phí còn 2 điểm POLITICS.",
    reasoning: "Sự thao túng chính sách công vì lợi ích tư bản độc quyền.",
  },
  {
    name: "Hợp đồng Đầu tư Công (Public Contracts)",
    cost: 250,
    coreFunction:
      "Đầu tư công: Mua các hợp đồng lớn từ chính phủ để thu về USD/DATA.",
    mechanism:
      "Người chơi chi 100 USD và 5 DATA để ký hợp đồng. Ngân hàng ngay lập tức trả 400 USD.",
    reasoning: "Nguồn lợi nhuận từ khu vực công, sự liên minh kinh tế công-tư.",
  },
  {
    name: "Ủy ban Điều phối Quy chế (Regulatory Council)",
    cost: 200,
    coreFunction:
      "Bảo hộ Nội địa: Dùng POLITICS để bảo vệ các ô độc quyền của mình.",
    mechanism:
      "Chi 2 điểm Ảnh hưởng Chính trị mỗi vòng để chọn một Ô Thị trường Độc quyền sở hữu và bảo vệ nó. Khi bất kỳ người chơi nào dừng tại ô được bảo vệ đó, phí thuê/thuế họ phải trả sẽ giảm 50%.",
    reasoning:
      "Chính phủ bảo hộ độc quyền nội địa (Chủ nghĩa Bảo hộ Độc quyền).",
  },
];

const GLOBAL_STRATEGY_SQUARES = [
  {
    name: "Xuất khẩu Tư bản (Capital Export)",
    cost: "500 USD + 50 DATA",
    coreFunction:
      'Thiết lập quyền lực ngoài phạm vi bàn cờ, tiến gần hơn đến chiến thắng "Siêu Độc quyền".',
    mechanism:
      "Người chơi có thể chi 500 USD và 50 DATA để nhận 1 Điểm Thống trị Toàn cầu (Global Hegemony Point). Người chơi cũng có thể chi 3 điểm Ảnh hưởng Chính trị để chặn một đối thủ sử dụng ô này trong lượt tiếp theo của họ.",
    reasoning:
      "Hoàn thiện đặc điểm Chủ nghĩa Đế quốc – Đỉnh cao của Tập trung Tư bản, Độc quyền Nhà nước, và Xuất khẩu Tư bản.",
  },
];

const INVESTIGATION_SQUARES = [
  {
    name: "Điều tra Độc quyền (Anti-Trust Probe)",
    type: "Điều tra",
    function: "Phạt tiền mặt và bị đe dọa chia tách.",
    impactText: "Nộp phạt: 250 USD hoặc 15 DATA.",
    penalty: {
      type: "choice",
      options: [
        { resource: "usd", amount: 250 },
        { resource: "data", amount: 15 },
      ],
    },
    reasoning: "Sự can thiệp của Nhà nước chống lại Tập trung Tư bản.",
  },
  {
    name: "Án phạt Bảo mật Dữ liệu (Data Privacy Fine)",
    type: "Điều tra",
    function: "Phạt DATA do rò rỉ thông tin cá nhân.",
    impactText: "Mất 20 DATA. Không thể dùng USD để trả phạt này.",
    penalty: {
      type: "single",
      resource: "data",
      amount: 20,
    },
    reasoning: "Rủi ro và áp lực pháp lý của Độc quyền Dữ liệu.",
  },
  {
    name: "Cơ quan Giám sát Lao động (Labor Regulator)",
    type: "Điều tra",
    function: "Phạt vì vi phạm quy tắc lao động/xã hội.",
    impactText: "Nộp phạt: 150 USD và mất 2 Ảnh hưởng Chính trị.",
    penalty: {
      type: "combined",
      penalties: [
        { resource: "usd", amount: 150 },
        { resource: "politics", amount: 2 },
      ],
    },
    reasoning: "Mâu thuẫn giữa tư bản độc quyền và tầng lớp lao động.",
  },
  {
    name: "Phản ứng Dư luận/Xã hội (Social Backlash)",
    type: "Điều tra",
    function: "Phạt POLITICS và DATA do mất niềm tin công chúng.",
    impactText: "Mất 4 Ảnh hưởng Chính trị hoặc 25 DATA.",
    penalty: {
      type: "choice",
      options: [
        { resource: "politics", amount: 4 },
        { resource: "data", amount: 25 },
      ],
    },
    reasoning: "Giới hạn Lịch sử từ áp lực và phản ứng của xã hội.",
  },
  {
    name: "Án phạt Thuế (Tax Evasion Fine)",
    type: "Điều tra",
    function:
      "Buộc người chơi phải trả một khoản tiền phạt cho Ngân hàng vì các hành vi trốn thuế hoặc các sai phạm tài chính tương tự.",
    impactText: "Người chơi hiện tại (PC) phải nộp phạt 200 USD hoặc 10 DATA.",
    penalty: {
      type: "choice",
      options: [
        { resource: "usd", amount: 200 },
        { resource: "data", amount: 10 },
      ],
    },
    reasoning:
      "Sự điều tiết của Nhà nước và chi phí pháp lý của tư bản tài chính độc quyền.",
  },
];

const EVENT_CARDS = [
  {
    title: "Xung đột Địa chính trị Lớn",
    effect: "Lợi nhuận từ Hạ tầng/Logistics giảm 50% trong 2 lượt.",
    reasoning:
      "Phân chia thế giới, cạnh tranh địa chính trị cản trở lưu thông tư bản.",
  },
  {
    title: "Lạm phát Toàn cầu Kéo dài",
    effect:
      "Lãi vay tại Ngân hàng Đầu tư tăng 50%. Phải trả thêm 50 USD tiền thuế/lãi suất.",
    reasoning: "Sự thống trị của Tư bản Tài chính và sự bế tắc của tư bản.",
  },
  {
    title: "Quốc hữu hóa Nền tảng Chiến lược",
    effect:
      "Người sở hữu Ô Hạ tầng Mạng lưới (5G/Cáp quang) phải bán lại 50% giá trị mua cho Ngân hàng.",
    reasoning:
      "Sự can thiệp của Độc quyền Nhà nước nhằm giành quyền kiểm soát hạ tầng công nghệ.",
  },
  {
    title: "Sóng sa thải Công nghệ",
    effect:
      "DATA giảm 10% (vì tốc độ tăng trưởng người dùng chậm lại). Người sở hữu AGI Core chi thêm 100 USD tái cấu trúc.",
    reasoning:
      "Khủng hoảng chu kỳ và sự phát triển không bền vững của mô hình công nghệ độc quyền.",
  },
  {
    title: "Biến đổi Khí hậu Cực đoan",
    effect:
      "Chi phí vận hành các ô Năng lượng tăng 2 lần trong 1 lượt. Chi phí vận hành Logistics tăng 100 USD.",
    reasoning:
      "Giới hạn tài nguyên và áp lực xã hội lên các tập đoàn sản xuất.",
  },
  {
    title: "Nổi dậy của Người Sáng tạo",
    effect:
      "Mất 15 DATA và 1 điểm Ảnh hưởng Chính trị (do người dùng ngừng tương tác).",
    reasoning:
      "Mâu thuẫn xã hội và sự phản ứng chống lại sự kiểm soát của nền tảng độc quyền.",
  },
  {
    title: "Chiến dịch Chống độc quyền Toàn cầu",
    effect:
      "Mất 20% USD hiện có. Tỷ lệ Quy đổi DATA sang USD giảm 20% trong vòng này.",
    reasoning:
      "Sự can thiệp của Nhà nước chống lại Tập trung Tư bản (Giới hạn Lịch sử).",
  },
  {
    title: "Đạo luật Bảo mật/Chủ quyền Dữ liệu Mới",
    effect: "Giảm 50% thu nhập DATA từ các ô AI/Dữ liệu trong 2 lượt.",
    reasoning:
      "Phân chia thế giới về công nghệ (Chủ nghĩa Đế quốc mới) và rào cản quy chế.",
  },
  {
    title: "Đại dịch Toàn cầu/Khủng hoảng Y tế",
    effect:
      "Tăng 30% lợi nhuận từ Thị trường Y tế (Genomics, EHR) và Thương mại Điện tử trong 2 lượt. Giảm 50% lợi nhuận từ các ô khác. Tất cả nhận 100 USD cứu trợ từ Ngân hàng.",
    reasoning:
      "Lợi ích tư bản độc quyền trong khủng hoảng, thúc đẩy chuyển đổi số, Độc quyền Nhà nước can thiệp bằng cứu trợ.",
  },
  {
    title: "Mở rộng Thị trường Mới nổi",
    effect:
      "Thị trường Độc quyền Y tế và Tài chính Số tăng 30% lợi nhuận trong 1 lượt.",
    reasoning: "Xuất khẩu Tư bản tìm kiếm thị trường sinh lợi mới.",
  },
];

const FORTUNE_CARDS = [
  {
    title: "Bị Điều tra Chống Độc quyền Cục bộ",
    effect: "PC phải nộp phạt 150 USD hoặc mất 4 điểm Ảnh hưởng Chính trị.",
    reasoning: "Sự điều tiết của Nhà nước.",
  },
  {
    title: "Vận động Hành lang Thành công",
    effect:
      "PC được thêm 2 điểm Ảnh hưởng Chính trị và hoàn lại 50 USD từ phí vận hành.",
    reasoning: "Độc quyền Nhà nước (Hòa quyện Quyền lực).",
  },
  {
    title: "Lỗi Bảo mật Dữ liệu Nghiêm trọng",
    effect: "PC phải hủy bỏ 50% DATA hiện có.",
    reasoning: "Rủi ro của độc quyền dữ liệu.",
  },
  {
    title: "Thăm dò Ý kiến Công chúng Tiêu cực",
    effect:
      "PC phải trả 100 USD phí PR. Lợi nhuận từ Mạng xã hội/Truyền thông giảm 50%.",
    reasoning: "Phản ứng xã hội đối với sự tập trung quyền lực.",
  },
  {
    title: "CEO được Tặng Huân chương Chính phủ",
    effect: "PC nhận thêm 3 điểm Ảnh hưởng Chính trị và 50 USD.",
    reasoning: "Sự liên minh chính trị/xã hội của giới tinh hoa.",
  },
  {
    title: "Công nghệ Độc quyền Bị sao chép",
    effect:
      "PC phải trả cho Ngân hàng 100 USD bồi thường hoặc tạm thời mất 10% lợi nhuận từ Ô Độc quyền đã sở hữu.",
    reasoning: "Rủi ro sở hữu trí tuệ/cạnh tranh không hoàn hảo.",
  },
  {
    title: "Hợp đồng Đầu tư Công Lớn",
    effect: "PC được Ngân hàng trả 200 USD và 5 DATA.",
    reasoning: "Nguồn thu từ khu vực công/Độc quyền Nhà nước.",
  },
  {
    title: "Tài liệu Offshore Bị rò rỉ",
    effect: "Nếu sở hữu Công ty Offshore, PC mất 20% USD giấu kín.",
    reasoning: "Rủi ro pháp lý của tài chính độc quyền.",
  },
  {
    title: "Mua lại Thành công Startup Chiến lược",
    effect:
      "PC được sở hữu một ô Thị trường Độc quyền ngẫu nhiên (chưa thuộc sở hữu của ai) với giá giảm 30%.",
    reasoning: "Tập trung tư bản thông qua M&A.",
  },
  {
    title: "Sự Tự Phủ Định (Thí nghiệm Xã hội Mở)",
    effect:
      "PC phải chi 100 USD để hỗ trợ xã hội, đổi lại được 3 điểm Ảnh hưởng Chính trị và 50 DATA.",
    reasoning: "Đầu tư vào hình thái xã hội mới (Thích nghi).",
  },
  {
    title: "Ký Hợp đồng Béo Bở với Quân đội",
    effect: "PC nhận 150 USD và 5 DATA.",
    reasoning: "Lợi nhuận từ lĩnh vực quân sự (Độc quyền Nhà nước).",
  },
  {
    title: "Bị Phanh phui Lùm xùm Đạo đức",
    effect: "PC mất 5 điểm Ảnh hưởng Chính trị.",
    reasoning: "Áp lực đạo đức/xã hội lên giới độc quyền.",
  },
  {
    title: "Chiến dịch Vận động Hành lang Tuyệt vời",
    effect:
      "PC được chọn một người chơi khác và lấy 2 điểm Ảnh hưởng Chính trị của họ.",
    reasoning: "Sử dụng quyền lực chính trị để chống đối thủ.",
  },
  {
    title: "Thua kiện Bằng sáng chế Quan trọng",
    effect: "PC phải trả cho Ngân hàng 100 USD tiền phạt.",
    reasoning: "Rủi ro pháp lý của độc quyền công nghệ.",
  },
  {
    title: "Lỗ hổng Bảo mật Dữ liệu Cơ quan Chính phủ",
    effect:
      "PC nhận 50 DATA và 1 điểm Ảnh hưởng Chính trị (do cung cấp giải pháp).",
    reasoning: "Lợi ích từ sự yếu kém của khu vực công.",
  },
  {
    title: "Tái cấu trúc Tổ chức/Cắt giảm Chi phí",
    effect: "PC được hoàn lại 100 USD từ chi phí đã bỏ ra.",
    reasoning: "Tăng cường hiệu quả, tập trung tư bản.",
  },
  {
    title: "Bị Truy Thu Thuế Lớn",
    effect: "PC phải trả cho Ngân hàng 200 USD.",
    reasoning: "Sự điều tiết của Nhà nước.",
  },
  {
    title: "CEO Tuyên bố 'Đạo đức kinh doanh là ưu tiên'",
    effect:
      "PC nhận 50 USD và 3 DATA, nhưng Ảnh hưởng Chính trị của PC bị giảm 1.",
    reasoning:
      "Dùng hình ảnh đạo đức để thu hút người dùng nhưng giảm sức mạnh chính trị.",
  },
  {
    title: "Đạt được Thỏa thuận Hợp tác Độc quyền (Cartel)",
    effect:
      "PC được thu 1 lần phí thuê từ một ô sở hữu của đối thủ (không cần đi qua).",
    reasoning: "Hình thức liên minh độc quyền giữa các tư bản.",
  },
  {
    title: "Thu thập Dữ liệu Cá nhân Thành công",
    effect: "PC nhận thêm 10 DATA.",
    reasoning: "Tối đa hóa khai thác tài nguyên dữ liệu.",
  },
];

// --- CÁC HẰNG SỐ QUY ĐỔI ---
const DATA_TO_USD_RATE = 50;
const POLITICS_TO_USD_RATE = 100;
const ASSET_VALUE_COEFFICIENT = 0.7;

// Tỷ giá quy đổi cơ bản (Mua/Bán)
const MANUAL_CONVERSION_RATES = {
  DATA_TO_USD: { rate: 50, explanation: "1 DATA = 50 USD" },
  POLITICS_TO_USD: { rate: 100, explanation: "1 POLITICS = 100 USD" },
  POLITICS_TO_DATA: { rate: 15, explanation: "1 POLITICS = 15 DATA" },
  USD_TO_DATA: { rate: 1 / 60, explanation: "60 USD = 1 DATA" },
  USD_TO_POLITICS: { rate: 1 / 150, explanation: "150 USD = 1 POLITICS" },
};

// Tỷ giá quy đổi phạt (Bất lợi)
const PENALTY_CONVERSION_RATES = {
  DATA_TO_USD: { rate: 40, explanation: "Bù đắp USD bằng DATA" },
  POLITICS_TO_USD: { rate: 80, explanation: "Bù đắp USD bằng POLITICS" },
  POLITICS_TO_DATA: { rate: 10, explanation: "Bù đắp DATA bằng POLITICS" },
};

const WIN_CONDITIONS = {
  superMonopoly: [
    "Kiểm soát Thị trường: Sở hữu tối thiểu 4 nhóm Thị trường Độc quyền.",
    "Kiểm soát Chính trị: Đạt tối thiểu 15 điểm Ảnh hưởng Chính trị cố định.",
    "Thống trị Toàn cầu: Tích lũy được 5 Điểm Thống trị Toàn cầu từ Ô Xuất khẩu Tư bản.",
  ],
  restructuring: [
    "Vượt Khủng hoảng: Là người đầu tiên duy trì tổng tài sản ròng trên 3,000 USD sau khi Cơ chế Khủng hoảng Vĩ mô được kích hoạt.",
    "Kiểm soát Nền tảng: Sở hữu toàn bộ 6 Ô Hạ tầng và Mạng lưới.",
  ],
};

// --- STYLES ---
const styles: { [key: string]: CSSProperties } = {
  container: { maxWidth: "1200px", margin: "0 auto", padding: "1rem" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    padding: "1rem",
    backgroundColor: "var(--secondary-color)",
    borderBottom: "1px solid var(--border-color)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerTitle: { margin: 0 },
  headerAssets: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  headerAssetItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "var(--text-color)",
  },
  h1: {
    color: "var(--primary-color)",
    fontSize: "2.5rem",
    margin: "0 0 0.5rem 0",
  },
  headerControls: { display: "flex", alignItems: "center", gap: "1.5rem" },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
    gap: "1rem",
  },
  tabButton: {
    background: "var(--secondary-color)",
    color: "var(--text-color)",
    border: "1px solid var(--border-color)",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  activeTab: {
    backgroundColor: "var(--primary-color)",
    color: "var(--bg-color)",
    border: "1px solid var(--primary-color)",
  },
  widget: {
    background: "var(--secondary-color)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  widgetTitle: {
    marginTop: 0,
    color: "var(--primary-color)",
    borderBottom: "1px solid var(--border-color)",
    paddingBottom: "0.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  assetDisplay: { textAlign: "center" },
  assetValue: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    color: "var(--success-color)",
  },
  assetControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    background: "var(--input-bg-color)",
    border: "1px solid var(--border-color)",
    color: "var(--text-color)",
    padding: "8px",
    borderRadius: "6px",
    width: "100px",
    textAlign: "center",
  },
  button: {
    background: "var(--primary-color)",
    color: "var(--bg-color)",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  dangerButton: { background: "var(--danger-color)", color: "var(--bg-color)" },
  propertyTable: { width: "100%", borderCollapse: "collapse" },
  th: { background: "var(--border-color)", padding: "10px", textAlign: "left" },
  td: { padding: "10px", borderBottom: "1px solid var(--border-color)" },
  ownedCheckbox: { width: "20px", height: "20px" },
  logArea: {
    width: "calc(100% - 20px)",
    height: "100px",
    background: "var(--input-bg-color)",
    color: "var(--text-color)",
    border: "1px solid var(--border-color)",
    borderRadius: "6px",
    padding: "10px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
    alignItems: "flex-end",
    marginBottom: "1rem",
  },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "0.5rem", fontSize: "0.9rem" },
  formInput: {
    background: "var(--input-bg-color)",
    border: "1px solid var(--border-color)",
    color: "var(--text-color)",
    padding: "8px",
    borderRadius: "6px",
  },
  toggleWrapper: { display: "flex", alignItems: "center", gap: "0.75rem" },
  toggleLabel: {
    fontSize: "0.9rem",
    color: "var(--text-color)",
    userSelect: "none",
  },
  toggleButton: {
    width: "50px",
    height: "26px",
    borderRadius: "13px",
    backgroundColor: "var(--border-color)",
    position: "relative",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.2s ease-in-out",
    padding: 0,
  },
  toggleButtonChecked: { backgroundColor: "var(--primary-color)" },
  toggleCircle: {
    display: "block",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    backgroundColor: "white",
    position: "absolute",
    top: "2px",
    left: "2px",
    transition: "transform 0.2s ease-in-out",
  },
  toggleCircleChecked: { transform: "translateX(24px)" },
  // Calculator styles
  calculator: {
    maxWidth: "320px",
    margin: "0 auto",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "var(--secondary-color)",
  },
  calculatorDisplay: {
    backgroundColor: "var(--input-bg-color)",
    color: "var(--text-color)",
    fontSize: "2.5rem",
    padding: "20px",
    textAlign: "right",
    borderBottom: "1px solid var(--border-color)",
    wordWrap: "break-word",
    wordBreak: "break-all",
    minHeight: "48px",
  },
  calculatorKeys: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    backgroundColor: "var(--border-color)",
  },
  calculatorButton: {
    padding: "20px 0",
    fontSize: "1.2rem",
    border: "none",
    backgroundColor: "var(--secondary-color)",
    color: "var(--text-color)",
    cursor: "pointer",
    transition: "background-color 0.2s",
    textAlign: "center",
  },
  operatorButton: {
    backgroundColor: "hsl(210, 10%, 30%)",
    color: "#fff",
  },
  functionButton: {
    backgroundColor: "hsl(210, 10%, 45%)",
    color: "#fff",
  },
  equalsButton: {
    backgroundColor: "var(--primary-color)",
    gridColumn: "span 2",
    color: "var(--bg-color)",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "var(--secondary-color)",
    padding: "2rem",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid var(--border-color)",
    paddingBottom: "1rem",
    marginBottom: "1rem",
  },
  modalTitle: {
    margin: 0,
    color: "var(--primary-color)",
    fontSize: "1.5rem",
  },
  modalCloseButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    color: "var(--text-color)",
    cursor: "pointer",
  },
  modalBody: {
    marginBottom: "1.5rem",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
  choiceOption: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    border: "1px solid var(--border-color)",
    borderRadius: "6px",
    marginBottom: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  choiceOptionSelected: {
    borderColor: "var(--primary-color)",
    backgroundColor: "rgba(88, 166, 255, 0.1)",
  },
  choiceOptionDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "var(--border-color)",
  },
  choiceRadio: {
    marginRight: "1rem",
    width: "18px",
    height: "18px",
    accentColor: "var(--primary-color)",
  },
  footer: {
    textAlign: "center",
    padding: "2rem 1rem",
    marginTop: "2rem",
    borderTop: "1px solid var(--border-color)",
    color: "var(--text-color)",
    opacity: 0.7,
    fontSize: "0.9rem",
  },
};

// --- COMPONENTS ---
const ToggleSwitch = ({ label, isChecked, onChange }) => {
  return (
    <div style={styles.toggleWrapper}>
      <span style={styles.toggleLabel}>{label}</span>
      <button
        role="switch"
        aria-checked={isChecked}
        onClick={onChange}
        style={{
          ...styles.toggleButton,
          ...(isChecked ? styles.toggleButtonChecked : {}),
        }}
      >
        <span
          style={{
            ...styles.toggleCircle,
            ...(isChecked ? styles.toggleCircleChecked : {}),
          }}
        ></span>
      </button>
    </div>
  );
};

const PenaltyModal = ({ isOpen, square, playerState, onClose, onConfirm }) => {
  const [selectedChoiceKey, setSelectedChoiceKey] = useState(null);

  useEffect(() => {
    if (isOpen && square && square.penalty.type === "choice") {
      // Pre-select the first affordable option when the modal opens
      const firstAffordableOption = square.penalty.options.find(
        (opt) => playerState[opt.resource] >= opt.amount
      );
      if (firstAffordableOption) {
        setSelectedChoiceKey(JSON.stringify(firstAffordableOption));
      } else {
        setSelectedChoiceKey(null); // No affordable options
      }
    }
  }, [isOpen, square, playerState]);

  if (!isOpen || !square) return null;

  const { penalty, name, impactText } = square;

  const handleConfirmClick = () => {
    if (penalty.type === "choice") {
      if (selectedChoiceKey) {
        onConfirm(JSON.parse(selectedChoiceKey));
      }
    } else {
      onConfirm();
    }
  };

  const isConfirmDisabled = () => {
    if (penalty.type === "choice") {
      return !selectedChoiceKey;
    }
    if (penalty.type === "single") {
      return playerState[penalty.resource] < penalty.amount;
    }
    if (penalty.type === "combined") {
      return penalty.penalties.some((p) => playerState[p.resource] < p.amount);
    }
    return false;
  };

  const renderPenaltyBody = () => {
    switch (penalty.type) {
      case "single":
      case "combined":
        return (
          <p>
            Bạn sẽ bị trừ: <strong>{impactText}</strong>. Bạn có muốn tiếp tục?
          </p>
        );
      case "choice":
        return (
          <div>
            <p>Vui lòng chọn một trong các hình thức phạt sau:</p>
            {penalty.options.map((opt, index) => {
              const key = JSON.stringify(opt);
              const isAffordable = playerState[opt.resource] >= opt.amount;
              const isSelected = selectedChoiceKey === key;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.choiceOption,
                    ...(isSelected && styles.choiceOptionSelected),
                    ...(!isAffordable && styles.choiceOptionDisabled),
                  }}
                  onClick={() => isAffordable && setSelectedChoiceKey(key)}
                >
                  <input
                    type="radio"
                    name="penalty-choice"
                    style={styles.choiceRadio}
                    checked={isSelected}
                    disabled={!isAffordable}
                    readOnly
                  />
                  <span>
                    Trả{" "}
                    <strong>
                      {opt.amount.toLocaleString()} {opt.resource.toUpperCase()}
                    </strong>
                  </span>
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Xác nhận Hình phạt</h3>
          <button style={styles.modalCloseButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div style={styles.modalBody}>
          <p>
            <strong>Ô sự kiện:</strong> {name}
          </p>
          {renderPenaltyBody()}
          {!isConfirmDisabled() ? null : (
            <p style={{ color: "var(--danger-color)", marginTop: "1rem" }}>
              Bạn không đủ tài sản để trả hình phạt này.
            </p>
          )}
        </div>
        <div style={styles.modalFooter}>
          <button
            style={{ ...styles.button, background: "var(--border-color)" }}
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            style={{ ...styles.button, ...styles.dangerButton }}
            onClick={handleConfirmClick}
            disabled={isConfirmDisabled()}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

const DebtAndCollateralManager = ({
  playerState,
  setPlayerState,
  addLogEntry,
}) => {
  const [source, setSource] = useState("Ngân hàng");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("15");
  const [collateralId, setCollateralId] = useState("");

  const availableAssetsForCollateral = useMemo(() => {
    return playerState.properties.filter((p) => p.owned && !p.mortgaged);
  }, [playerState.properties]);

  const handleAddLoan = (e) => {
    e.preventDefault();
    const loanAmount = parseInt(amount, 10);
    const rate = parseInt(interestRate, 10);
    if (!loanAmount || !rate || loanAmount <= 0 || rate <= 0) {
      alert("Vui lòng nhập số tiền vay và lãi suất hợp lệ.");
      return;
    }

    const collateralAsset = playerState.properties.find(
      (p) => p.id === parseInt(collateralId, 10)
    );

    const newLoan = {
      id: Date.now(),
      source,
      amount: loanAmount,
      interestRate: rate,
      collateralAssetId: collateralId ? parseInt(collateralId, 10) : null,
    };

    setPlayerState((prev) => {
      const newProperties = prev.properties.map((p) => {
        if (p.id === newLoan.collateralAssetId) {
          return { ...p, mortgaged: true };
        }
        return p;
      });

      return {
        ...prev,
        usd: prev.usd + loanAmount,
        loans: [...prev.loans, newLoan],
        properties: newProperties,
      };
    });

    addLogEntry(
      `Vay ${loanAmount.toLocaleString()} USD từ ${source} với lãi suất ${rate}%. ${
        collateralAsset ? `Cầm cố ${collateralAsset.name}.` : ""
      }`
    );

    // Reset form
    setSource("Ngân hàng");
    setAmount("");
    setInterestRate("15");
    setCollateralId("");
  };

  const handleRepayLoan = (loanToRepay) => {
    if (playerState.usd < loanToRepay.amount) {
      alert("Không đủ USD để trả nợ.");
      return;
    }

    const collateralAsset = playerState.properties.find(
      (p) => p.id === loanToRepay.collateralAssetId
    );

    setPlayerState((prev) => {
      const newProperties = prev.properties.map((p) => {
        if (p.id === loanToRepay.collateralAssetId) {
          return { ...p, mortgaged: false }; // Redeem asset
        }
        return p;
      });

      return {
        ...prev,
        usd: prev.usd - loanToRepay.amount,
        loans: prev.loans.filter((loan) => loan.id !== loanToRepay.id),
        properties: newProperties,
      };
    });

    addLogEntry(
      `Trả nợ ${loanToRepay.amount.toLocaleString()} USD cho ${
        loanToRepay.source
      }. ${collateralAsset ? `Giải chấp ${collateralAsset.name}.` : ""}`
    );
  };

  return (
    <div style={styles.widget}>
      <h2 style={styles.widgetTitle}>📜 Hồ sơ Nợ & Cầm cố</h2>

      <form onSubmit={handleAddLoan}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nguồn vay</label>
            <input
              type="text"
              style={styles.formInput}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Số tiền vay (USD)</label>
            <input
              type="number"
              style={styles.formInput}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Lãi suất (%/vòng)</label>
            <input
              type="number"
              style={styles.formInput}
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tài sản cầm cố (Tùy chọn)</label>
            <select
              style={styles.formInput}
              value={collateralId}
              onChange={(e) => setCollateralId(e.target.value)}
            >
              <option value="">Không có</option>
              {availableAssetsForCollateral.map((asset) => (
                <option key={asset.id} value={asset.id.toString()}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              alignSelf: "flex-end",
              padding: "10px 15px",
            }}
          >
            + Thêm khoản vay
          </button>
        </div>
      </form>

      <h3 style={{ marginTop: "2rem" }}>Các khoản nợ hiện tại</h3>
      <table style={styles.propertyTable}>
        <thead>
          <tr>
            <th style={styles.th}>Nguồn vay</th>
            <th style={styles.th}>Số tiền vay</th>
            <th style={styles.th}>Lãi suất</th>
            <th style={styles.th}>Tài sản cầm cố</th>
            <th style={styles.th}>Lãi vòng sau</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {playerState.loans.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ ...styles.td, textAlign: "center" }}>
                Không có khoản nợ nào.
              </td>
            </tr>
          ) : (
            playerState.loans.map((loan) => {
              const collateralAsset = playerState.properties.find(
                (p) => p.id === loan.collateralAssetId
              );
              const interestDue = Math.round(
                loan.amount * (loan.interestRate / 100)
              );
              return (
                <tr key={loan.id}>
                  <td style={styles.td}>{loan.source}</td>
                  <td style={styles.td}>{loan.amount.toLocaleString()} USD</td>
                  <td style={styles.td}>{loan.interestRate}%</td>
                  <td style={styles.td}>
                    {collateralAsset ? collateralAsset.name : "Không có"}
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: "var(--danger-color)" }}>
                      {interestDue.toLocaleString()} USD
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.dangerButton }}
                      onClick={() => handleRepayLoan(loan)}
                    >
                      💰 Trả nợ
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const ConversionManager = ({ playerState, setPlayerState, addLogEntry }) => {
  const [fromAsset, setFromAsset] = useState("DATA");
  const [toAsset, setToAsset] = useState("USD");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0");
  const [rateInfo, setRateInfo] = useState("");

  const ASSET_MAP = {
    USD: { name: "USD", value: playerState.usd },
    DATA: { name: "DATA", value: playerState.data },
    POLITICS: { name: "Ảnh hưởng Chính trị", value: playerState.politics },
  };

  const VALID_CONVERSIONS = {
    DATA: ["USD"],
    POLITICS: ["USD", "DATA"],
    USD: ["DATA", "POLITICS"],
  };

  useEffect(() => {
    const amount = parseFloat(fromAmount);
    if (!amount || amount <= 0 || fromAsset === toAsset) {
      setToAmount("0");
      setRateInfo("");
      return;
    }

    const conversionKey = `${fromAsset}_TO_${toAsset}`;
    const rateData = MANUAL_CONVERSION_RATES[conversionKey];

    if (rateData) {
      const result = amount * rateData.rate;
      setToAmount(Math.floor(result).toLocaleString());
      setRateInfo(`Tỷ giá: ${rateData.explanation}`);
    } else {
      setToAmount("0");
      setRateInfo("Quy đổi không hợp lệ.");
    }
  }, [fromAsset, toAsset, fromAmount]);

  useEffect(() => {
    if (!VALID_CONVERSIONS[fromAsset].includes(toAsset)) {
      setToAsset(VALID_CONVERSIONS[fromAsset][0]);
    }
  }, [fromAsset]);

  const handleConversion = () => {
    const amount = parseFloat(fromAmount);
    if (!amount || amount <= 0) {
      alert("Vui lòng nhập số lượng hợp lệ.");
      return;
    }

    const fromAssetKey = fromAsset.toLowerCase();
    if (playerState[fromAssetKey] < amount) {
      alert(`Không đủ ${ASSET_MAP[fromAsset].name} để thực hiện quy đổi.`);
      return;
    }

    const conversionKey = `${fromAsset}_TO_${toAsset}`;
    const rateData = MANUAL_CONVERSION_RATES[conversionKey];
    if (!rateData) {
      alert("Quy đổi không hợp lệ.");
      return;
    }

    const resultAmount = Math.floor(amount * rateData.rate);

    setPlayerState((prev) => {
      const newPlayerState = { ...prev };
      newPlayerState[fromAsset.toLowerCase()] -= amount;
      newPlayerState[toAsset.toLowerCase()] += resultAmount;
      return newPlayerState;
    });

    addLogEntry(
      `Quy đổi ${amount.toLocaleString()} ${fromAsset} thành ${resultAmount.toLocaleString()} ${toAsset}.`
    );
    setFromAmount("");
  };

  return (
    <div style={styles.widget}>
      <h2 style={styles.widgetTitle}>💱 Công cụ Quy đổi Tài sản</h2>
      <div
        style={{
          ...styles.formGrid,
          gridTemplateColumns: "2fr 1fr 2fr 2fr 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* From */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Từ (Bạn có)</label>
          <select
            style={styles.formInput}
            value={fromAsset}
            onChange={(e) => setFromAsset(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="DATA">DATA</option>
            <option value="POLITICS">POLITICS</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Số lượng</label>
          <input
            type="number"
            style={styles.formInput}
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0"
          />
        </div>

        {/* To */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Thành (Bạn muốn)</label>
          <select
            style={styles.formInput}
            value={toAsset}
            onChange={(e) => setToAsset(e.target.value)}
          >
            {VALID_CONVERSIONS[fromAsset].map((asset) => (
              <option key={asset} value={asset}>
                {ASSET_MAP[asset].name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Số lượng nhận được</label>
          <input
            type="text"
            style={{
              ...styles.formInput,
              fontWeight: "bold",
              color: "var(--success-color)",
            }}
            value={toAmount}
            readOnly
          />
        </div>

        <button
          onClick={handleConversion}
          style={{
            ...styles.button,
            alignSelf: "flex-end",
            padding: "10px 15px",
          }}
        >
          Quy đổi
        </button>
      </div>
      {rateInfo && (
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontStyle: "italic",
            color: "var(--warning-color)",
          }}
        >
          {rateInfo}
        </p>
      )}
    </div>
  );
};

const CEO_Dashboard = ({ playerState, setPlayerState, addLogEntry }) => {
  const [usdChange, setUsdChange] = useState("0");
  const [dataChange, setDataChange] = useState("0");
  const [politicsChange, setPoliticsChange] = useState("0");
  const [hegemonyPointsChange, setHegemonyPointsChange] = useState("0");

  const handleAssetChange = (asset, value) => {
    setPlayerState((prev) => ({
      ...prev,
      [asset]: Math.max(0, prev[asset] + value),
    }));
  };

  const netWorth = useMemo(() => {
    const fixedAssetValue =
      playerState.properties
        .filter((p) => p.owned && !p.mortgaged)
        .reduce((sum, p) => sum + p.cost, 0) * ASSET_VALUE_COEFFICIENT;
    const dataValue = playerState.data * DATA_TO_USD_RATE;
    const politicsValue = playerState.politics * POLITICS_TO_USD_RATE;
    const totalLoans = playerState.loans.reduce(
      (sum, loan) => sum + loan.amount,
      0
    );
    const totalNetWorth =
      playerState.usd +
      dataValue +
      politicsValue +
      fixedAssetValue -
      totalLoans;
    return Math.round(totalNetWorth);
  }, [playerState]);

  const roundIncome = useMemo(() => {
    return playerState.properties
      .filter((p) => p.owned && !p.mortgaged)
      .reduce(
        (acc, prop) => {
          acc.usd += prop.income.usd;
          acc.data += prop.income.data;
          return acc;
        },
        { usd: 0, data: 0 }
      );
  }, [playerState.properties]);

  const totalInterestDue = useMemo(() => {
    return playerState.loans.reduce((sum, loan) => {
      return sum + Math.round(loan.amount * (loan.interestRate / 100));
    }, 0);
  }, [playerState.loans]);

  const collectRoundIncome = () => {
    const netUsd = 200 + roundIncome.usd - totalInterestDue;
    const netData = 10 + roundIncome.data;
    setPlayerState((prev) => ({
      ...prev,
      usd: prev.usd + netUsd,
      data: prev.data + netData,
    }));
    addLogEntry(
      `Nhận lương vòng: +${netUsd.toLocaleString()} USD, +${netData.toLocaleString()} DATA.`
    );
  };

  const handleCapitalExport = () => {
    const usdCost = 500;
    const dataCost = 50;

    if (playerState.usd < usdCost || playerState.data < dataCost) {
      alert(`Không đủ tài nguyên. Cần ${usdCost} USD và ${dataCost} DATA.`);
      return;
    }

    setPlayerState((prev) => ({
      ...prev,
      usd: prev.usd - usdCost,
      data: prev.data - dataCost,
      hegemonyPoints: prev.hegemonyPoints + 1,
    }));

    addLogEntry(
      `Xuất khẩu tư bản: -${usdCost} USD, -${dataCost} DATA, +1 Điểm Thống trị.`
    );
    alert(
      "Thực hiện Xuất khẩu Tư bản thành công! Nhận được 1 Điểm Thống trị Toàn cầu."
    );
  };

  const AssetManager = ({ title, asset, value, setter }) => (
    <div style={styles.assetDisplay}>
      <h3 style={{ color: "var(--text-color)", margin: 0 }}>{title}</h3>
      <p style={styles.assetValue}>{value.toLocaleString()}</p>
      <div style={styles.assetControls}>
        <button
          style={styles.button}
          onClick={() => handleAssetChange(asset, -Number(setter.get))}
        >
          -
        </button>
        <input
          type="number"
          style={styles.input}
          value={setter.get}
          onChange={(e) => setter.set(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={() => handleAssetChange(asset, Number(setter.get))}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>📊 Bảng Điều Khiển Tài Sản</h2>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <AssetManager
            title="💵 USD"
            asset="usd"
            value={playerState.usd}
            setter={{ get: usdChange, set: setUsdChange }}
          />
          <AssetManager
            title="💾 DATA"
            asset="data"
            value={playerState.data}
            setter={{ get: dataChange, set: setDataChange }}
          />
          <AssetManager
            title="🏛️ Ảnh hưởng Chính trị"
            asset="politics"
            value={playerState.politics}
            setter={{ get: politicsChange, set: setPoliticsChange }}
          />
          <AssetManager
            title="🌍 Điểm Thống trị"
            asset="hegemonyPoints"
            value={playerState.hegemonyPoints}
            setter={{ get: hegemonyPointsChange, set: setHegemonyPointsChange }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h3>
            Tổng Tài Sản Ròng (Ước tính):{" "}
            <span style={{ color: "var(--warning-color)" }}>
              {netWorth.toLocaleString()} USD
            </span>
          </h3>
        </div>
      </div>

      <ConversionManager
        playerState={playerState}
        setPlayerState={setPlayerState}
        addLogEntry={addLogEntry}
      />

      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>🚀 Hành động Chiến lược</h2>
        <p>
          Sử dụng tài nguyên để thực hiện các nước đi chiến lược quan trọng,
          giành lấy Điểm Thống trị Toàn cầu.
        </p>
        <button
          style={{
            ...styles.button,
            width: "100%",
            padding: "12px",
            background: "var(--warning-color)",
          }}
          onClick={handleCapitalExport}
        >
          Thực hiện Xuất khẩu Tư bản (-500 USD, -50 DATA, +1 Điểm Thống trị)
        </button>
      </div>

      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>💰 Lợi Nhuận Vòng</h2>
        <p>Lương cơ bản: 200 USD, 10 DATA</p>
        <p>
          Thu nhập từ tài sản: {roundIncome.usd} USD, {roundIncome.data} DATA
        </p>
        <p>
          Chi phí lãi vay:{" "}
          <span style={{ color: "var(--danger-color)" }}>
            {totalInterestDue.toLocaleString()} USD
          </span>
        </p>
        <hr style={{ borderColor: "var(--border-color)", margin: "1rem 0" }} />
        <p>
          <strong>
            Tổng cộng:{" "}
            {(200 + roundIncome.usd - totalInterestDue).toLocaleString()} USD,{" "}
            {(10 + roundIncome.data).toLocaleString()} DATA
          </strong>
        </p>
        <button
          style={{ ...styles.button, width: "100%", padding: "12px" }}
          onClick={collectRoundIncome}
        >
          Nhận Lương Vòng Mới
        </button>
      </div>

      <DebtAndCollateralManager
        playerState={playerState}
        setPlayerState={setPlayerState}
        addLogEntry={addLogEntry}
      />
    </div>
  );
};

const InfrastructureBonusTable = ({ gameMode }) => (
  <div style={styles.widget}>
    <h2 style={styles.widgetTitle}>🎁 Bonus Tích hợp Hạ tầng & Mạng lưới</h2>
    <table style={styles.propertyTable}>
      <thead>
        <tr>
          <th style={styles.th}>Tên Hạ tầng/Mạng lưới</th>
          <th style={styles.th}>Bonus Tích hợp</th>
          <th style={styles.th}>Tác dụng trong Gameplay</th>
          {gameMode === "politics" && (
            <th style={styles.th}>Phản ánh Lý luận</th>
          )}
        </tr>
      </thead>
      <tbody>
        {INFRASTRUCTURE_BONUSES.map((bonus, index) => (
          <tr key={`bonus-${index}`}>
            <td style={{ ...styles.td, width: "20%" }}>{bonus.name}</td>
            <td style={{ ...styles.td, width: "20%" }}>
              <strong>{bonus.bonus}</strong>
            </td>
            <td
              style={{
                ...styles.td,
                width: gameMode === "politics" ? "30%" : "60%",
              }}
            >
              {bonus.effect}
            </td>
            {gameMode === "politics" && (
              <td style={{ ...styles.td, width: "30%", fontStyle: "italic" }}>
                {bonus.reasoning}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FinancialCapitalTable = ({ gameMode }) => (
  <div style={styles.widget}>
    <h2 style={styles.widgetTitle}>🏦 Ô Tài chính & Tư bản</h2>
    <table style={styles.propertyTable}>
      <thead>
        <tr>
          <th style={styles.th}>Tên Ô</th>
          <th style={styles.th}>Chi Phí (USD)</th>
          <th style={styles.th}>Chức năng Cốt lõi</th>
          <th style={styles.th}>Cơ chế Chi tiết</th>
          {gameMode === "politics" && (
            <th style={styles.th}>Phản ánh Lý luận</th>
          )}
        </tr>
      </thead>
      <tbody>
        {FINANCIAL_SQUARES.map((square, index) => (
          <tr key={`financial-${index}`}>
            <td style={{ ...styles.td, width: "15%" }}>
              <strong>{square.name}</strong>
            </td>
            <td style={{ ...styles.td, width: "10%", textAlign: "center" }}>
              {square.cost}
            </td>
            <td style={{ ...styles.td, width: "20%" }}>
              {square.coreFunction}
            </td>
            <td
              style={{
                ...styles.td,
                width: gameMode === "politics" ? "35%" : "55%",
              }}
            >
              {square.mechanism}
            </td>
            {gameMode === "politics" && (
              <td style={{ ...styles.td, width: "20%", fontStyle: "italic" }}>
                {square.reasoning}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const GovernmentRegulationTable = ({ gameMode }) => (
  <div style={styles.widget}>
    <h2 style={styles.widgetTitle}>🏛️ Ô Chính phủ & Quy chế</h2>
    <table style={styles.propertyTable}>
      <thead>
        <tr>
          <th style={styles.th}>Tên Ô</th>
          <th style={styles.th}>Chi Phí (USD)</th>
          <th style={styles.th}>Chức năng Cốt lõi</th>
          <th style={styles.th}>Cơ chế Chi tiết</th>
          {gameMode === "politics" && (
            <th style={styles.th}>Phản ánh Lý luận</th>
          )}
        </tr>
      </thead>
      <tbody>
        {GOVERNMENT_SQUARES.map((square, index) => (
          <tr key={`gov-${index}`}>
            <td style={{ ...styles.td, width: "15%" }}>
              <strong>{square.name}</strong>
            </td>
            <td style={{ ...styles.td, width: "10%", textAlign: "center" }}>
              {square.cost}
            </td>
            <td style={{ ...styles.td, width: "20%" }}>
              {square.coreFunction}
            </td>
            <td
              style={{
                ...styles.td,
                width: gameMode === "politics" ? "35%" : "55%",
              }}
            >
              {square.mechanism}
            </td>
            {gameMode === "politics" && (
              <td style={{ ...styles.td, width: "20%", fontStyle: "italic" }}>
                {square.reasoning}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const GlobalStrategyTable = ({ gameMode }) => (
  <div style={styles.widget}>
    <h2 style={styles.widgetTitle}>🌍 Ô Chiến lược Toàn cầu</h2>
    <table style={styles.propertyTable}>
      <thead>
        <tr>
          <th style={styles.th}>Tên Ô</th>
          <th style={styles.th}>Chi Phí</th>
          <th style={styles.th}>Chức năng Cốt lõi</th>
          <th style={styles.th}>Cơ chế Chi tiết</th>
          {gameMode === "politics" && (
            <th style={styles.th}>Phản ánh Lý luận</th>
          )}
        </tr>
      </thead>
      <tbody>
        {GLOBAL_STRATEGY_SQUARES.map((square, index) => (
          <tr key={`strategy-${index}`}>
            <td style={{ ...styles.td, width: "15%" }}>
              <strong>{square.name}</strong>
            </td>
            <td style={{ ...styles.td, width: "15%", textAlign: "center" }}>
              {square.cost}
            </td>
            <td style={{ ...styles.td, width: "20%" }}>
              {square.coreFunction}
            </td>
            <td
              style={{
                ...styles.td,
                width: gameMode === "politics" ? "30%" : "50%",
              }}
            >
              {square.mechanism}
            </td>
            {gameMode === "politics" && (
              <td style={{ ...styles.td, width: "20%", fontStyle: "italic" }}>
                {square.reasoning}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InvestigationTable = ({ gameMode, onApplyPenalty }) => (
  <div style={styles.widget}>
    <h2 style={styles.widgetTitle}>🕵️ Ô Điều tra & Khủng hoảng</h2>
    <table style={styles.propertyTable}>
      <thead>
        <tr>
          <th style={styles.th}>Tên Ô Khủng hoảng</th>
          <th style={styles.th}>Loại Ô</th>
          <th style={styles.th}>Chức Năng Chính (Khi dừng)</th>
          <th style={styles.th}>Mức Phạt/Tác động Cơ bản</th>
          {gameMode === "politics" && (
            <th style={styles.th}>Phản ánh Lý luận</th>
          )}
          <th style={styles.th}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {INVESTIGATION_SQUARES.map((square, index) => (
          <tr key={`investigation-${index}`}>
            <td style={{ ...styles.td, width: "20%" }}>
              <strong>{square.name}</strong>
            </td>
            <td style={{ ...styles.td, width: "10%" }}>{square.type}</td>
            <td style={{ ...styles.td, width: "25%" }}>{square.function}</td>
            <td style={{ ...styles.td, width: "20%" }}>{square.impactText}</td>
            {gameMode === "politics" && (
              <td style={{ ...styles.td, width: "25%", fontStyle: "italic" }}>
                {square.reasoning}
              </td>
            )}
            <td style={{ ...styles.td, textAlign: "center" }}>
              <button
                style={{ ...styles.button, ...styles.dangerButton }}
                onClick={() => onApplyPenalty(square)}
              >
                Áp dụng Phạt
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Reference_Hub = ({
  playerState,
  setPlayerState,
  gameMode,
  addLogEntry,
}) => {
  const [penaltyModalState, setPenaltyModalState] = useState({
    isOpen: false,
    square: null,
  });

  const handleOwnershipChange = (propertyId) => {
    setPlayerState((prev) => {
      const property = prev.properties.find((p) => p.id === propertyId);
      if (!property) return prev;

      const isCurrentlyOwned = property.owned;

      if (isCurrentlyOwned) {
        // --- SELLING ---
        if (property.mortgaged) {
          alert("Không thể bán tài sản đang cầm cố. Vui lòng trả nợ trước.");
          return prev;
        }
        addLogEntry(
          `Bán ${property.name} thu về ${property.cost.toLocaleString()} USD.`
        );
        // Add cost back to USD and set owned to false
        return {
          ...prev,
          usd: prev.usd + property.cost,
          properties: prev.properties.map((p) =>
            p.id === propertyId ? { ...p, owned: false } : p
          ),
        };
      } else {
        // --- BUYING ---
        if (prev.usd < property.cost) {
          alert(
            `Không đủ USD để mua ${
              property.name
            }. Cần ${property.cost.toLocaleString()} USD, bạn chỉ có ${prev.usd.toLocaleString()} USD.`
          );
          return prev;
        }

        addLogEntry(
          `Mua ${property.name} với giá ${property.cost.toLocaleString()} USD.`
        );
        // Deduct cost from USD and set owned to true
        return {
          ...prev,
          usd: prev.usd - property.cost,
          properties: prev.properties.map((p) =>
            p.id === propertyId ? { ...p, owned: true } : p
          ),
        };
      }
    });
  };

  const handleRentPayment = (propertyId) => {
    const property = playerState.properties.find((p) => p.id === propertyId);
    if (!property) return;

    const rent = property.rent;
    const usdCost = typeof rent === "number" ? rent : rent?.usd || 0;
    const dataCost = typeof rent === "object" ? rent?.data || 0 : 0;

    if (playerState.usd >= usdCost && playerState.data >= dataCost) {
      // Normal payment
      setPlayerState((prev) => ({
        ...prev,
        usd: prev.usd - usdCost,
        data: prev.data - dataCost,
      }));
      addLogEntry(
        `Trả phí thuê ${usdCost} USD và ${dataCost} DATA cho ${property.name}.`
      );
      return;
    }

    // Penalty Conversion Logic
    if (
      !confirm(
        "Bạn không đủ tài sản để trả phí. Bạn có muốn dùng tài sản khác để bù đắp theo tỷ giá phạt không?"
      )
    ) {
      return;
    }

    let tempUsd = playerState.usd;
    let tempData = playerState.data;
    let tempPolitics = playerState.politics;
    const conversionLogs = [];

    const usdShortfall = Math.max(0, usdCost - tempUsd);
    if (usdShortfall > 0) {
      const dataNeeded = Math.ceil(
        usdShortfall / PENALTY_CONVERSION_RATES.DATA_TO_USD.rate
      );
      const politicsNeeded = Math.ceil(
        usdShortfall / PENALTY_CONVERSION_RATES.POLITICS_TO_USD.rate
      );

      const canUseData = tempData - dataCost >= dataNeeded;
      const canUsePolitics = tempPolitics >= politicsNeeded;

      let choice = "";
      if (canUseData && canUsePolitics) {
        choice = prompt(
          `Thiếu ${usdShortfall} USD. Vui lòng chọn cách bù đắp:\n1. Dùng ${dataNeeded} DATA\n2. Dùng ${politicsNeeded} POLITICS`
        );
      } else if (canUseData) {
        choice = "1";
      } else if (canUsePolitics) {
        choice = "2";
      }

      if (choice === "1" && canUseData) {
        const loss = Math.round(
          dataNeeded *
            (MANUAL_CONVERSION_RATES.DATA_TO_USD.rate -
              PENALTY_CONVERSION_RATES.DATA_TO_USD.rate)
        );
        if (
          confirm(
            `Bạn sẽ dùng ${dataNeeded} DATA để bù ${usdShortfall} USD (lỗ ~${loss} USD). Xác nhận?`
          )
        ) {
          tempData -= dataNeeded;
          tempUsd += usdShortfall;
          conversionLogs.push(
            `Bù ${usdShortfall} USD bằng ${dataNeeded} DATA (phạt).`
          );
        } else return;
      } else if (choice === "2" && canUsePolitics) {
        const loss = Math.round(
          politicsNeeded *
            (MANUAL_CONVERSION_RATES.POLITICS_TO_USD.rate -
              PENALTY_CONVERSION_RATES.POLITICS_TO_USD.rate)
        );
        if (
          confirm(
            `Bạn sẽ dùng ${politicsNeeded} POLITICS để bù ${usdShortfall} USD (lỗ ~${loss} USD). Xác nhận?`
          )
        ) {
          tempPolitics -= politicsNeeded;
          tempUsd += usdShortfall;
          conversionLogs.push(
            `Bù ${usdShortfall} USD bằng ${politicsNeeded} POLITICS (phạt).`
          );
        } else return;
      } else {
        alert("Không đủ tài sản để bù đắp USD.");
        return;
      }
    }

    const dataShortfall = Math.max(0, dataCost - tempData);
    if (dataShortfall > 0) {
      const politicsNeeded = Math.ceil(
        dataShortfall / PENALTY_CONVERSION_RATES.POLITICS_TO_DATA.rate
      );
      if (tempPolitics >= politicsNeeded) {
        const loss = Math.round(
          politicsNeeded *
            (MANUAL_CONVERSION_RATES.POLITICS_TO_DATA.rate -
              PENALTY_CONVERSION_RATES.POLITICS_TO_DATA.rate)
        );
        if (
          confirm(
            `Thiếu ${dataShortfall} DATA. Bạn sẽ dùng ${politicsNeeded} POLITICS để bù (lỗ ~${loss} USD quy đổi). Xác nhận?`
          )
        ) {
          tempPolitics -= politicsNeeded;
          tempData += dataShortfall;
          conversionLogs.push(
            `Bù ${dataShortfall} DATA bằng ${politicsNeeded} POLITICS (phạt).`
          );
        } else return;
      } else {
        alert("Không đủ tài sản để bù đắp DATA.");
        return;
      }
    }

    // Final transaction
    setPlayerState({
      ...playerState,
      usd: tempUsd - usdCost,
      data: tempData - dataCost,
      politics: tempPolitics,
    });

    conversionLogs.forEach((log) => addLogEntry(log));
    addLogEntry(
      `Trả phí thuê ${usdCost} USD và ${dataCost} DATA cho ${property.name}.`
    );
  };

  const triggerPenalty = (square) => {
    setPenaltyModalState({ isOpen: true, square });
  };

  const handleClosePenaltyModal = () => {
    setPenaltyModalState({ isOpen: false, square: null });
  };

  const handleConfirmPenalty = (chosenOption = null) => {
    const { square } = penaltyModalState;
    if (!square) return;

    const { penalty, name } = square;

    if (penalty.type === "single") {
      const { resource, amount } = penalty;
      setPlayerState((prev) => ({
        ...prev,
        [resource]: prev[resource] - amount,
      }));
      addLogEntry(
        `Chịu phạt từ "${name}": -${amount.toLocaleString()} ${resource.toUpperCase()}.`
      );
    } else if (penalty.type === "combined") {
      setPlayerState((prev) => {
        const newState = { ...prev };
        penalty.penalties.forEach((p) => {
          newState[p.resource] -= p.amount;
        });
        return newState;
      });
      const logParts = penalty.penalties
        .map((p) => `-${p.amount.toLocaleString()} ${p.resource.toUpperCase()}`)
        .join(", ");
      addLogEntry(`Chịu phạt từ "${name}": ${logParts}.`);
    } else if (penalty.type === "choice") {
      if (!chosenOption) {
        handleClosePenaltyModal();
        return;
      }
      const { resource, amount } = chosenOption;
      setPlayerState((prev) => ({
        ...prev,
        [resource]: prev[resource] - amount,
      }));
      addLogEntry(
        `Chịu phạt từ "${name}": -${amount.toLocaleString()} ${resource.toUpperCase()} (lựa chọn).`
      );
    }
    handleClosePenaltyModal();
  };

  const CardList = ({ title, cards, gameMode }) => (
    <div style={{ ...styles.widget, flex: 1 }}>
      <h3 style={styles.widgetTitle}>{title}</h3>
      <ul style={{ paddingLeft: "20px", listStyle: "none" }}>
        {cards.map((card, index) => (
          <li key={`${title}-${index}`} style={{ marginBottom: "1rem" }}>
            <strong>{card.title}:</strong> {card.effect}
            {gameMode === "politics" && card.reasoning && (
              <p
                style={{
                  fontStyle: "italic",
                  color: "var(--warning-color)",
                  margin: "0.25rem 0 0 0",
                }}
              >
                Lý luận: {card.reasoning}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <PenaltyModal
        isOpen={penaltyModalState.isOpen}
        square={penaltyModalState.square}
        playerState={playerState}
        onClose={handleClosePenaltyModal}
        onConfirm={handleConfirmPenalty}
      />
      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>🏢 Danh mục Tài sản Doanh nghiệp</h2>
        <table style={styles.propertyTable}>
          <thead>
            <tr>
              <th style={styles.th}>Sở hữu</th>
              <th style={styles.th}>Tên</th>
              <th style={styles.th}>Loại</th>
              <th style={styles.th}>Chi phí (USD)</th>
              <th style={styles.th}>Lợi nhuận / Ảnh hưởng</th>
              <th style={styles.th}>Phí Thuê</th>
            </tr>
          </thead>
          <tbody>
            {playerState.properties.map((p) => {
              const rent = p.rent;
              let rentText = "";
              if (rent) {
                if (typeof rent === "number") {
                  rentText = `${rent.toLocaleString()} USD`;
                } else if (typeof rent === "object" && rent !== null) {
                  const parts = [];
                  if (rent.usd) parts.push(`${rent.usd.toLocaleString()} USD`);
                  if (rent.data)
                    parts.push(`${rent.data.toLocaleString()} DATA`);
                  rentText = parts.join(" & ");
                }
              }

              return (
                <tr
                  key={p.id}
                  style={{
                    backgroundColor: p.mortgaged
                      ? "rgba(248, 81, 73, 0.1)"
                      : "transparent",
                  }}
                >
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      style={styles.ownedCheckbox}
                      checked={p.owned}
                      onChange={() => handleOwnershipChange(p.id)}
                    />
                  </td>
                  <td style={styles.td}>
                    {p.name}
                    {p.mortgaged && (
                      <span
                        style={{
                          color: "var(--danger-color)",
                          marginLeft: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        (Cầm cố)
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>{p.category}</td>
                  <td style={styles.td}>{p.cost.toLocaleString()}</td>
                  <td style={styles.td}>
                    {p.mortgaged ? (
                      <span
                        style={{
                          color: "var(--danger-color)",
                          textDecoration: "line-through",
                        }}
                      >
                        {p.income.usd} USD, {p.income.data} DATA
                      </span>
                    ) : (
                      `${p.income.usd} USD, ${p.income.data} DATA, ${p.politics} Politics`
                    )}
                  </td>
                  <td style={styles.td}>
                    {!p.owned && rent && (
                      <button
                        style={{
                          ...styles.button,
                          ...styles.dangerButton,
                          fontSize: "0.9rem",
                          padding: "6px 10px",
                        }}
                        onClick={() => handleRentPayment(p.id)}
                      >
                        Trả {rentText}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <InfrastructureBonusTable gameMode={gameMode} />

      <FinancialCapitalTable gameMode={gameMode} />

      <GovernmentRegulationTable gameMode={gameMode} />

      <GlobalStrategyTable gameMode={gameMode} />

      <InvestigationTable gameMode={gameMode} onApplyPenalty={triggerPenalty} />

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <CardList
          title="⚡ Thẻ Sự kiện"
          cards={EVENT_CARDS}
          gameMode={gameMode}
        />
        <CardList
          title="🍀 Thẻ Khí vận"
          cards={FORTUNE_CARDS}
          gameMode={gameMode}
        />
      </div>
      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>📜 Quy tắc & Điều kiện</h2>
        <div style={styles.grid}>
          <div>
            <h3>Điều kiện Thắng</h3>
            <strong>Siêu Độc Quyền:</strong>
            <ul>
              {WIN_CONDITIONS.superMonopoly.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <strong>Tái cấu trúc:</strong>
            <ul>
              {WIN_CONDITIONS.restructuring.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tools = ({ log, addLogEntry }) => {
  // Calculator State
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Log State
  const [manualLogEntry, setManualLogEntry] = useState("");

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearCalculator = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      const resultString = String(parseFloat(result.toPrecision(15)));
      setDisplayValue(resultString);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      default:
        return second;
    }
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue(String(currentValue / 100));
  };

  const handleAddManualLogEntry = () => {
    if (manualLogEntry.trim()) {
      addLogEntry(`(Thủ công) ${manualLogEntry}`);
      setManualLogEntry("");
    }
  };

  const CalculatorButton = ({ onClick, children, style: customStyle = {} }) => (
    <button
      onClick={onClick}
      style={{ ...styles.calculatorButton, ...customStyle }}
    >
      {children}
    </button>
  );

  return (
    <div style={styles.grid}>
      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>🧮 Máy tính cầm tay</h2>
        <div style={styles.calculator}>
          <div style={styles.calculatorDisplay}>{displayValue}</div>
          <div style={styles.calculatorKeys}>
            <CalculatorButton
              onClick={clearCalculator}
              style={styles.functionButton}
            >
              AC
            </CalculatorButton>
            <CalculatorButton
              onClick={inputPercent}
              style={styles.functionButton}
            >
              %
            </CalculatorButton>
            <CalculatorButton
              onClick={() => performOperation("/")}
              style={styles.operatorButton}
            >
              ÷
            </CalculatorButton>
            <CalculatorButton
              onClick={() => performOperation("*")}
              style={styles.operatorButton}
            >
              ×
            </CalculatorButton>

            <CalculatorButton onClick={() => inputDigit(7)}>7</CalculatorButton>
            <CalculatorButton onClick={() => inputDigit(8)}>8</CalculatorButton>
            <CalculatorButton onClick={() => inputDigit(9)}>9</CalculatorButton>
            <CalculatorButton
              onClick={() => performOperation("-")}
              style={styles.operatorButton}
            >
              -
            </CalculatorButton>

            <CalculatorButton onClick={() => inputDigit(4)}>4</CalculatorButton>
            <CalculatorButton onClick={() => inputDigit(5)}>5</CalculatorButton>
            <CalculatorButton onClick={() => inputDigit(6)}>6</CalculatorButton>
            <CalculatorButton
              onClick={() => performOperation("+")}
              style={styles.operatorButton}
            >
              +
            </CalculatorButton>

            <CalculatorButton onClick={() => inputDigit(1)}>1</CalculatorButton>
            <CalculatorButton onClick={() => inputDigit(2)}>2</CalculatorButton>
            <CalculatorButton onClick={() => inputDigit(3)}>3</CalculatorButton>
            <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>

            <CalculatorButton
              onClick={() => inputDigit(0)}
              style={{ gridColumn: "span 2" }}
            >
              0
            </CalculatorButton>
            <CalculatorButton
              onClick={() => performOperation("=")}
              style={styles.equalsButton}
            >
              =
            </CalculatorButton>
          </div>
        </div>
      </div>
      <div style={styles.widget}>
        <h2 style={styles.widgetTitle}>📝 Nhật ký Giao dịch</h2>
        <input
          type="text"
          placeholder="Ghi chú thủ công..."
          style={{
            ...styles.input,
            width: "calc(100% - 20px)",
            marginBottom: "10px",
          }}
          value={manualLogEntry}
          onChange={(e) => setManualLogEntry(e.target.value)}
        />
        <button
          style={{ ...styles.button, width: "100%" }}
          onClick={handleAddManualLogEntry}
        >
          Ghi lại
        </button>
        <textarea
          style={{ ...styles.logArea, marginTop: "10px", height: "150px" }}
          readOnly
          value={log}
        ></textarea>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>Được phát triển bởi MeoDiHia 🐾</p>
    </footer>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [gameMode, setGameMode] = useState("politics"); // 'politics' or 'game'
  const [theme, setTheme] = useState("dark"); // 'dark' or 'light'
  const [log, setLog] = useState("");
  const [playerState, setPlayerState] = useState({
    usd: 1500,
    data: 100,
    politics: 5,
    hegemonyPoints: 0,
    properties: JSON.parse(JSON.stringify(PROPERTIES)), // Deep copy
    loans: [],
  });

  const addLogEntry = useCallback((entryText) => {
    const timestamp = new Date().toLocaleTimeString("en-GB");
    setLog((prev) => `[${timestamp}] ${entryText}\n${prev}`);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [theme]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <CEO_Dashboard
            playerState={playerState}
            setPlayerState={setPlayerState}
            addLogEntry={addLogEntry}
          />
        );
      case "reference":
        return (
          <Reference_Hub
            playerState={playerState}
            setPlayerState={setPlayerState}
            gameMode={gameMode}
            addLogEntry={addLogEntry}
          />
        );
      case "tools":
        return <Tools log={log} addLogEntry={addLogEntry} />;
      default:
        return null;
    }
  };

  return (
    <main>
      <header style={styles.header}>
        <div style={styles.headerTitle}>
          <h1 style={styles.h1}>ĐẾ CHẾ ĐỘC QUYỀN</h1>
          <p>Bảng Điều Khiển CEO</p>
        </div>
        <div style={styles.headerAssets}>
          <div style={styles.headerAssetItem}>
            <span>💵</span>
            <span>{playerState.usd.toLocaleString()}</span>
          </div>
          <div style={styles.headerAssetItem}>
            <span>💾</span>
            <span>{playerState.data.toLocaleString()}</span>
          </div>
          <div style={styles.headerAssetItem}>
            <span>🏛️</span>
            <span>{playerState.politics.toLocaleString()}</span>
          </div>
        </div>
        <div style={styles.headerControls}>
          <ToggleSwitch
            label={gameMode === "politics" ? "🏛️ Politics" : "🎮 Game"}
            isChecked={gameMode === "politics"}
            onChange={() =>
              setGameMode((prev) => (prev === "politics" ? "game" : "politics"))
            }
          />
          <ToggleSwitch
            label={theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            isChecked={theme === "light"}
            onChange={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          />
        </div>
      </header>

      <nav style={styles.tabs}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === "dashboard" && styles.activeTab),
          }}
          onClick={() => setActiveTab("dashboard")}
        >
          Quản lý Tập đoàn
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === "reference" && styles.activeTab),
          }}
          onClick={() => setActiveTab("reference")}
        >
          Trung tâm Tra cứu
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === "tools" && styles.activeTab),
          }}
          onClick={() => setActiveTab("tools")}
        >
          Công cụ Hỗ trợ
        </button>
      </nav>
      <div>{renderTabContent()}</div>
      <Footer />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
