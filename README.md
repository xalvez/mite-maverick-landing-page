.vision-card::before, .vision-card::after, 
.bottom-left-horizontal, .bottom-left-vertical {
  content: '';
  position: absolute;
  background: var(--accent-1);
  transition: all 0.8s ease;
  z-index: 5;
}

.vision-card::before { top: 0; right: 0; width: 50px; height: 2px; }
.vision-card::after { top: 0; right: 0; width: 2px; height: 50px; }
.bottom-left-horizontal { bottom: 0; left: 0; width: 50px; height: 2px; }
.bottom-left-vertical { bottom: 0; left: 0; width: 2px; height: 50px; }




  [dir="rtl"] select option {
   font-family: var(--font-arabic);
  }

[dir="rtl"] select {
  
}




{t.labels.sector}:
{t.labels.platform}:
{t.labels.identity}:
{t.labels.delivery}:
{t.labels.tech}:
{t.labels.budget}:
{t.labels.contact}:




