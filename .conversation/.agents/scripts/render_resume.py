import fitz, os, json
pdf='attached_assets/Visal_Phal_1788782290536.pdf'
out='.agents/outputs/resume_pages'
os.makedirs(out, exist_ok=True)
doc=fitz.open(pdf)
print('pages', doc.page_count)
print('metadata', doc.metadata)
for i, page in enumerate(doc):
    pix=page.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False)
    path=f'{out}/page-{i+1}.png'
    pix.save(path)
    print(path, pix.width, pix.height)
    print('---TEXT PAGE', i+1, '---')
    print(page.get_text())
