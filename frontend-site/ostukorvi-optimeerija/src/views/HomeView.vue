
<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">
          Stop Overpaying. <br />
          <span class="highlight">Start Saving Smarter.</span>
        </h1>
        <p class="hero-subtitle">
          Tired of hunting for deals? We optimize your entire shopping cart by 
          comparing real-time prices across retailers to find the absolute 
          lowest total for your basket.
        </p>
        <RouterLink to="/products" class="cta-button">
          Start Saving Now
        </RouterLink>
      </div>
    </section>

    <section class="info-grid">
      <div class="info-card">
        <div class="icon-circle">🛒</div>
        <h3>Enter Your List</h3>
        <p>Add groceries and essentials to your digital basket with just a few clicks.</p>
      </div>

      <div class="info-card">
        <div class="icon-circle">⚖️</div>
        <h3>Compare Stores</h3>
        <p>Our engine scans local retailers to find who has the cheapest total price today.</p>
      </div>

      <div class="info-card">
        <div class="icon-circle">✅</div>
        <h3>Checkout & Save</h3>
        <p>See exactly where to shop to get the most value for your money. Automatic and convenient.</p>
      </div>
    </section>

    <footer class="home-footer">
      <p>Ready to see your cheapest route to checkout?</p>
      <RouterLink to="/products" class="secondary-link">Browse Products &rarr;</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped ensures these styles don't leak into your other pages */
.home-container {
  font-family: 'Inter', sans-serif;
  color: #2c3e50;
  background-color: #f8fafc;
;
  min-height: 100vh;
}

.hero-section {
  padding: 100px 20px;
  background: #f8fafc;
  text-align: center;
}

.main-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
}

.highlight {
  color: #64e1fa;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #5d6d7e;
  max-width: 650px;
  margin: 0 auto 40px;
}

.cta-button {
  background-color: #8be6f8;
  color: black;
  padding: 18px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 4px 14px 0 rgba(194, 251, 255, 0.39);
  transition: all 0.3s ease;
  display: inline-block;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(39, 174, 96, 0.23);
  background-color: #acf1ff;
}

/* Info Cards Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 80px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  text-align: center;
  padding: 40px;
  border-radius: 20px;
  background: #fdfdfd;
  border: 1px solid #f0f0f0;
  transition: border 0.3s ease;
}

.info-card:hover {
  border-color: #8be6f8;
}

.icon-circle {
  font-size: 2.5rem;
  margin-bottom: 20px;
  display: inline-block;
}

.info-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.info-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

.home-footer {
  text-align: center;
  padding: 60px 20px;
  border-top: 1px solid #eee;
}

.secondary-link {
  color: #8be6f8;
  text-decoration: none;
  font-weight: 600;
}

.secondary-link:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
}
</style>