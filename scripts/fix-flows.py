from pathlib import Path
import re
root=Path(__file__).resolve().parent.parent
for lang in ['en','fr','es','ar']:
 p=root/lang/'trip-builder/index.html';text=p.read_text(encoding='utf-8')
 text=text.replace("console.log('Trip Builder selections:', JSON.stringify(selections, null, 2));","window.AdrarJourney(resultOverlay.querySelector('.result-card'), selections);")
 text=text.replace("}, 2500);","}, 250);")
 text=re.sub(r'<p data-i18n="builder.result.desc">.*?</p>','',text,flags=re.S)
 p.write_text(text,encoding='utf-8')
 p=root/lang/'contact/index.html';text=p.read_text(encoding='utf-8')
 text=text.replace("// Hide form, show success\n                form.style.display = 'none';", "// Prepare an email draft; no message is sent by this static site.\n                const draft = new URLSearchParams({subject: 'Morocco journey enquiry', body: Array.from(new FormData(form), ([key, value]) => key + ': ' + value).join('\\n')});\n                window.location.href = 'mailto:hello@adrarvoyages.ma?' + draft.toString().replace(/\\+/g, '%20');")
 text=re.sub(r'(<div class="form-success" id="form-success">)(.*?)(</div>)',lambda m:m[1]+{'en':'<h3>Your email draft is ready</h3><p>Send it from your email app to complete your enquiry. If no app opened, email hello@adrarvoyages.ma. Your form stays here so you can copy your details.</p>','fr':'<h3>Votre brouillon est prêt</h3><p>Envoyez-le depuis votre messagerie. Sinon, écrivez à hello@adrarvoyages.ma.</p>','es':'<h3>Tu borrador está listo</h3><p>Envíalo desde tu aplicación de correo. Si no se abrió, escribe a hello@adrarvoyages.ma.</p>','ar':'<h3>مسودة بريدك جاهزة</h3><p>أرسلها من تطبيق البريد لإكمال طلبك. أو راسل hello@adrarvoyages.ma.</p>'}[lang]+m[3],text,flags=re.S)
 p.write_text(text,encoding='utf-8')
p=root/'js/features.js';text=p.read_text(encoding='utf-8')
text=text.replace('Typically replies in minutes','Automated travel guide')
text=text.replace("Thank you for your message! Our travel team will get back to you shortly. For immediate assistance, tap 'Talk to human' or reach us on WhatsApp.", 'This is an automated guide and messages are not sent to our team. For a personal response, use the contact page or email hello@adrarvoyages.ma.')
text=re.sub(r'human: "[^"]*"', 'human: "To contact the travel team, visit the Contact page or email hello@adrarvoyages.ma. This automated chat does not send your messages."',text)
start=text.find('  /* =========================================\n     7. LIVE AVAILABILITY INDICATORS')
if start!=-1:text=text[:start]+'\n});\n'
p.write_text(text,encoding='utf-8')
print('Planner results and contact drafts connected.')
