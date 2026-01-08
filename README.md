.final-cta {
  backdrop-filter: var(--glass-blur);
  padding: 30px 30px;
  text-align: center;
  transition: all 2s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  bottom: 450px;
  overflow: hidden;
}

/* Top-right corner piece */
.final-cta::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 60px; /* Length of glow */
  height: 2px; /* Border thickness */
  background: linear-gradient(to left, 
    #42CCA4 0%,
    #42CCA4 30%,
    #42CCA4 60%,
    transparent 100%
  );
 
transition: all 1s ease;
  
}

/* Top-right vertical piece */
.final-cta::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 60px;
  background: linear-gradient(to bottom, 
    #26AA87 0%,
    #26AA87 30%,
    #26AA87 60%,
    transparent 100%
  );

transition: all 1s ease;

}

/* Bottom-left corner piece */
.final-cta .bottom-left-horizontal {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, 
    #26AA87 0%,
    #26AA87 30%,
    #26AA87 60%,
    transparent 100%
  );

transition: all 1s ease;

}

/* Bottom-left vertical piece */
.final-cta .bottom-left-vertical {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2px;
  height: 60px;
  background: linear-gradient(to top, 
    #26AA87 0%,
    #26AA87 30%,
    #26AA87 60%,
    transparent 100%
  );
transition: all 1s ease;
}

.final-cta:hover {
  transform: translateY(-30px);
  box-shadow: var(--glass-shadow);  
}

.final-cta:hover::after {
  height: 200px;
}

.final-cta:hover::before{
  width: 1000px;
}

.final-cta:hover .bottom-left-horizontal{
  width: 1000px;
}

.final-cta:hover .bottom-left-vertical{
  height: 200px;
}


                <div class="bottom-left-horizontal"></div>
                <div class="bottom-left-vertical"></div>