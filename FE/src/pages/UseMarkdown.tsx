import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography } from '@mui/material';

const markdown = `
Dưới đây là một số kí hiệu cơ bản :

1,Tiêu đề:
# Tiêu đề cấp 1
## Tiêu đề cấp 2
### Tiêu đề cấp 3
#### Tiêu đề cấp 4
##### Tiêu đề cấp 5
###### Tiêu đề cấp 6

2,Đoạn văn:
Đây là một đoạn văn bình thường.

3,Chữ in đậm và in nghiêng:
**Chữ in đậm**
*Chữ in nghiêng*

4,Link:
[Tên đường dẫn](URL)

5,Hình ảnh:
![Chú thích hình ảnh](URL_hình_ảnh)

6,Danh sách:
- Mục danh sách 1
- Mục danh sách 2
  - Mục con danh sách

7,Trích dẫn:
> Đây là một trích dẫn.

8,Mã nguồn:
\`\`\`language
Mã nguồn
\`\`\`

9,Bảng:
| Cột 1 | Cột 2 |
|-------|-------|
| Giá trị 1 | Giá trị 2 |

10,Dòng ngang:
---

11,Gạch chân:
<u>Gạch chân</u>

12,Kích thước chữ:
<sub>Chữ nhỏ</sub>
<sup>Chữ lớn</sup>

13,Ký tự đặc biệt:

\\* Ký tự in đậm
`;

const Use = () => {
  return (
    <Box>
      {markdown.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}{' '}
    </Box>
  );
};

export default Use;
