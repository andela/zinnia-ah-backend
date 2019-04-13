/**
 * Base Email Template
 * @sends { string } email
 * @returns { string } response
 * @param { object }emailBody
 */
const mailTemplate = emailBody => `<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Authors Haven</title>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0pt auto; padding: 0px; background:#F4F7FA;">
<table id="main" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4F7FA">
<tbody>
  <tr>
    <td valign="top">
      <table cellpadding="0" width="580" cellspacing="0" border="0" bgcolor="#F4F7FA" align="center"
        style="margin:0 auto; table-layout: fixed;">
        <tbody>
          <tr>
            <td colspan="4">
              <table class="logo" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tbody>
                  
                </tbody>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <tbody>
                  <tr>
                    <td height="40"></td>
                  </tr>
                  <tr style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI; color:#4E5C6E; font-size:14px; line-height:20px; margin-top:20px;">
                    <td class="content" colspan="2" valign="top" align="center" style="padding-left:90px; padding-right:90px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                        <tbody>
                          <tr>
                            <td align="center" valign="bottom" colspan="2" cellpadding="3">
                              <img alt="Authors Haven Logo" width="250" height="70" src="https://res.cloudinary.com/nedy123/image/upload/v1555181530/LOGO_1_d27299.png" />
                            </td>
                          </tr>
                          <tr>
                            <td height="30" &nbsp;=""></td>
                          </tr>
                          <tr>
                            <td align="center"> <span style="color:#48545d;font-size:22px; line-height: 24px;">
                                ${emailBody.title}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td align="center" width="60%" style="margin:50px; max-width:400px"> <span style="color:#48545d; font-size:14px; line-height:20px; max-width:300px">
                                ${emailBody.content}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td height="20"></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="60"></td>
                  </tr>
                </tbody>
              </table>
              <!-- Main CONTENT end here -->
              <!-- FOOTER start here -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tbody>
                  <tr style="background-color: #221100; color:white">
                    <td valign="center" align="center" height="50"> <span style="font-family: -apple-system,BlinkMacSystemFont,sans-serif; color:#221100; font-size:10px;">&copy;
                        <a href="#" target="_blank" style="color:#ffffff; text-decoration:none;">Author's
                          Haven</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="#" target="_self" style="color:#ffffff; text-decoration:none;">&copy; 2019 </a>
                      </span>
                    </td>
                    <td valign="center" align="center" height="50"> <span style="font-family: -apple-system,BlinkMacSystemFont,sans-serif; color:#ffffff; font-size:10px;">
                        <p style="color:#ffffff; text-decoration:none;">Built by Zinnia Team</p>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td height="50">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <!-- FOOTER end here -->
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
</body>
</html>
`;

export default mailTemplate;
